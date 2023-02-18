const mongoose = require('mongoose')
const Category = require('../Category')
const CATEGORY = {
  家居: 'https://fontawesome.com/icons/home?style=solid',
  交通: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid'
}
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  const categoryKeyArray = Object.keys(CATEGORY)
  for (let i = 0; i < Object.keys(CATEGORY).length; i++) {
    Category.create({
      name: categoryKeyArray[i],
      url: CATEGORY[categoryKeyArray[i]]
    })
  }
  console.log('CategorySeeder done!')
})
