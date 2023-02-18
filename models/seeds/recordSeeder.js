const mongoose = require('mongoose')
const Record = require('../Record')
const Category = require('../Category')
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
db.once('open', () => {
  console.log('mongodb connected!')
  Category.find()
    .then((category) => {
      const categoryId = category.map((categoryItem) => {
        return categoryItem._id
      })
      return categoryId // array
    })
    .then((id) => {
      for (let i = 0; i < categoryId.length; i++) {
        Record.create({
          name: `Random name ${i}`,
          categoryId: id[i],
          date: `2023/02/0${i + 1}`,
          amount: (Math.random() + i + 1) * 100
        }).then((record) => {
          Category.findById(id[i])
            .then(category => {
              category.records.push(record._id)
              category.save()
            })
        })
      }
    })
  console.log('RecordSeeder done!')
    .catch((error) => { console.log(error) })
}

)
