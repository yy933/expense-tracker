const mongoose = require('mongoose')
const Record = require('../Record')
const Category = require('../Category')
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
    categoryIds.forEach(categoryId => {
      Record.create({
        itemName: faker.commerce.productName(),
        categoryId,
        date: faker.date.recent({ days: 30, refDate: '2023-08-10T00:00:00.000Z' }),
        amount: faker.finance.amount({ min: 15, max: 3999, dec: 0 })
      })
    })
  } catch (error) {
    console.log(error)
  }

  // Category.find().lean()
  //   .then((categories) => {
  //     const categoryId = categories.map((category) => {
  //       return category._id
  //     })
  //     console.log(categoryId)
  //     return categoryId // return an array
  //   })
  //   .then((id) => {
  //     for (let i = 0; i < id.length; i++) {
  //       Record.create({
  //         name: `Random name ${i}`,
  //         categoryId: id[i],
  //         date: `2023/02/0${i + 1}`,
  //         amount: (Math.random() + i + 1) * 100
  //       })
  //   .then((record) => {
  //         Category.findById(id[i])
  //           .then(category => {
  //             category.records.push(record._id)
  //             category.save()
  //           })
  //       })
  //     }
  //     console.log('RecordSeeder done!')
  //   })

  // .catch((error) => { console.log(error) })
}

)
