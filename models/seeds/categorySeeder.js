const Category = require('../Category')
const CATEGORY = {
  家居: 'fa-house',
  交通: 'fa-van-shuttle',
  休閒娛樂: 'fa-face-grin-beam',
  餐飲: 'fa-utensils',
  其他: 'fa-pen'
}
const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  try {
    console.log('mongodb connected!')
    const categoryKeyArray = Object.keys(CATEGORY)
    const categories = categoryKeyArray.map((category) => {
      return Category.create({
        name: category,
        url: `<i class="fa-solid ${CATEGORY[category]}"></i>`
      })
    })
    await Promise.all(categories)
    console.log('Category seeder done!')
    return process.exit(0)
  } catch (error) {
    console.log(error)
    return process.exit(1)
  }
})
