// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)
// 將網址結構符合 /records 字串開頭的 request 導向 records 模組
router.use('/records', records)

module.exports = router
