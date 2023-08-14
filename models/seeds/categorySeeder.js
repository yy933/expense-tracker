const Category = require('../Category')
const CATEGORY = {
  家居: 'fa-house',
  交通: 'fa-van-shuttle',
  休閒娛樂: 'fa-face-grin-beam',
  餐飲: 'fa-utensils',
  其他: 'fa-pen'
}
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  const categoryKeyArray = Object.keys(CATEGORY)
  categoryKeyArray.forEach((category) => {
    Category.create({
      name: category,
      url: `<i class="fa-solid ${CATEGORY[category]}"></i>`
    })
  })
  console.log('Category seeder done!')
})
