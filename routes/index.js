const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const user = require('./modules/user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/user', user)
router.use('/records', authenticator, records)
router.use('/auth', auth)
router.use('/', authenticator, home)
module.exports = router
