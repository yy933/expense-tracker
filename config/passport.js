const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const Users = require('../models/Users')

// Local Strategy
passport.use('local',
  new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    Users.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(
            null,
            false,
            req.flash('warning_msg', '這個Email尚未註冊')
          )
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(
              null,
              false,
              req.flash('warning_msg', '帳號或密碼錯誤!')
            )
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  })
)
// Serialize and deserialize
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  Users.findById(id)
    .lean()
    .then(user => {
      delete user.password
      return user
    })
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.BASE_URL + '/auth/google/callback'
},
async (accessToken, refreshToken, profile, cb) => {
  try {
    const { name, email } = profile._json
    const user = await Users.findOne({ email })
    if (user) return cb(null, user)
    const randomPassword = Math.random().toString(36).slice(-8)
    const salt = bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(randomPassword, salt)
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword
    })
    return cb(null, newUser)
  } catch (err) {
    console.log('Error: ', err)
    cb(err, false)
  }
}))

module.exports = passport
