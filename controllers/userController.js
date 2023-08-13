const bcrypt = require('bcryptjs')
const Users = require('../models/Users')

const userController = {
  getLogin: (req, res, next) => {
    try {
      res.render('users/login')
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getRegister: (req, res, next) => {
    try {
      res.render('users/register')
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  register: (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
      return res.render('users/register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    Users.findOne({ email }).then(user => {
      if (user) {
        console.log('User already exists!')
        errors.push({ message: '這個 Email 已經註冊過了，請登入' })
        return res.render('users/register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
        .then((salt) => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
        .then((hash) =>
          Users.create({
            name: name || email.slice(0, email.indexOf('@')),
            email,
            password: hash // 用雜湊值取代原本的使用者密碼
          })
        )
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
    })
      .catch(
        (error) => {
          console.log(error)
          next(error)
        }
      )
  }

}
module.exports = userController
