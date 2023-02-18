// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const user = require('./modules/user')
const auth = require("./modules/auth");
const { authenticator } = require('../middleware/auth')



router.use('/user', user)
// 將網址結構符合 /records 字串開頭的 request 導向 records 模組
router.use('/records', authenticator, records)
router.use('/auth', auth)  // 掛載模組
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', authenticator, home)
module.exports = router
