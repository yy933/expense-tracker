const mongoose = require('mongoose')
const Record = require('../Record')
const Category = require('../Category')
const User = require('../Users')
const { faker } = require('@faker-js/faker')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  console.log('mongodb connected!')
  try {
    const categories = await Category.find().lean()
    const categoryIds = categories.map(category => {
      return category._id
    })
    const userId = await User.findOne({ email: 'root@example.com' }, { _id: 1 })
    categoryIds.forEach(async (categoryId, index) => {
      await Record.create({
        itemName: faker.commerce.productName(),
        categoryId,
        date: `2023-07-1${index}T00:00:00.000Z`,
        amount: faker.finance.amount({ min: 15, max: 3999, dec: 0 }),
        userId
      })
    })
    console.log('Record seeder done!')
  } catch (error) {
    console.log(error)
  }
}

)
