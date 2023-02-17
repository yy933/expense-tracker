const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
// routes

app.get('/register', (req, res, next) => {
  res.render('register')
})
app.get('/login', (req, res, next) => {
  res.render('login')
})
app.listen(port, () => {
  console.log(`App is runnung on http://localhost:${port}`)
})
