// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const user = require('./modules/user')
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)
// 將網址結構符合 /records 字串開頭的 request 導向 records 模組
router.use('/records', records)
router.use('/user', user)
module.exports = router
