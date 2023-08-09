const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')
const passport = require('./config/passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const routes = require('./routes')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
// 初始化 Passport 模組
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(flash())
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
