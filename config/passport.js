const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const Users = require('../models/Users')

// 設定本地登入策略
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
// 設定序列化與反序列化
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  Users.findById(id)
    .lean()
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
// Facebook Strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK,
//       profileFields: ['email', 'displayName']
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const { name, email } = profile._json
//       Users.findOne({ email }).then((user) => {
//         if (user) return done(null, user)
//         const randomPassword = Math.random().toString(36).slice(-8)
//         bcrypt
//           .genSalt(10)
//           .then((salt) => bcrypt.hash(randomPassword, salt))
//           .then((hash) =>
//             Users.create({
//               name,
//               email,
//               password: hash
//             })
//           )
//           .then((user) => done(null, user))
//           .catch((err) => done(err, false))
//       })
//     }
//   )
// )

module.exports = passport
