const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
// routes
app.get('/', (req, res, next) => {
  res.send('Expense tracker')
})
app.listen(port, () => {
  console.log(`App is runnung on http://localhost:${port}`)
})
