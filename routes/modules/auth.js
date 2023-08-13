const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')

// login with google
router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }))
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

module.exports = router
