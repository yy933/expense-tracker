const Category = require('../Category')
const CATEGORY = {
  家居: 'https://fontawesome.com/icons/home?style=solid',
  交通: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid'
}
const db = require("../../config/mongoose");

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
