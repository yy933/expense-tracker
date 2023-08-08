const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')

// login with google
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }))
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

// router.get(
//   '/facebook',
//   passport.authenticate('facebook', {
//     scope: ['email', 'public_profile']
//   })
// )

// router.get(
//   '/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/user/login'
//   })
// )

module.exports = router
