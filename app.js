const express = require('express')
const app = express()
const port = 3000
const exphbs = require("express-handlebars");
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI)

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

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static('public'))
// routes
app.get('/', (req, res, next) => {
  res.render('index')
})
app.listen(port, () => {
  console.log(`App is runnung on http://localhost:${port}`)
})
