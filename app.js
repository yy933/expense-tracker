const express = require('express')
const app = express()
const port = 3000
const exphbs = require("express-handlebars");
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Record = require('./models/Record')
const bodyParser = require('body-parser')
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
app.use(bodyParser.urlencoded({extended: true}))
// routes
app.get('/', (req, res, next) => {
  Record.find()
    .lean()
    .then((records) => res.render("index", {records}))
    .catch((error)=>console.log(error))
  
})
app.get('/records/new', (req, res, next)=>{
  res.render('new')
})
app.post('/records', (req, res, next)=>{
  const contents = req.body
  const newRecord = new Record({...contents})
  newRecord.save()
  .then(()=>res.redirect('/'))
  .catch((error)=>{console.log(error)})
})
app.get("/records/:id/edit", (req, res, next) => {
  const id = req.params.id
  const contents = req.body
  return Record.findById(id)
    .lean()
    .then((record) => res.render("edit", {record}))
    .catch((error) => {
      console.log(error);
    });
  
});
app.get("/register", (req, res, next) => {
  res.render("register");
});
app.get("/login", (req, res, next) => {
  res.render("login");
});
app.listen(port, () => {
  console.log(`App is runnung on http://localhost:${port}`)
})
