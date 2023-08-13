const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const user = require('./modules/user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')
const errorHandler = require('../middleware/error-handler')
router.use('/user', user)
router.use('/records', authenticator, records)
router.use('/auth', auth)
router.use('/', authenticator, home)

router.use(errorHandler.errorLogger)
router.use(errorHandler.errorResponder)

router.get('*', (req, res) => {
  res.status(404).render('error', {
    status: 404,
    errName: 'Error',
    errMessage: 'Page not found!'
  })
})

module.exports = router
