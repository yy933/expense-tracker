const Record = require('../record')
const Category = require('../Category')
const User = require('../Users')
const { faker } = require('@faker-js/faker')
const db = require('../../config/mongoose')

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', async () => {
  try {
    console.log('mongodb connected!')
    const categories = await Category.find().lean()
    const categoryIds = categories.map(category => {
      return category._id
    })
    const userId = await User.findOne({ email: 'root@example.com' }, { _id: 1 })

    const records = categoryIds.map((categoryId, index) => {
      return Record.create({
        itemName: faker.commerce.productName(),
        categoryId,
        date: `2023-07-1${index}T00:00:00.000Z`,
        amount: faker.finance.amount({ min: 15, max: 3999, dec: 0 }),
        userId
      })
    })
    await Promise.all(records)
    console.log('Record seeder done!')
    return process.exit(0)
  } catch (error) {
    console.log(error)
    return process.exit(1)
  }
})
