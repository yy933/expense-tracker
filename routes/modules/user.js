const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const passport = require('passport')

router.get('/login', userController.getLogin)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login',
  failureFlash: true
}))
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/user/login')
})
router.get('/register', userController.getRegister)
router.post('/register', userController.register)
module.exports = router
