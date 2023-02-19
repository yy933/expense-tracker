const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
// 首頁
router.get('/', (req, res, next) => {
  const userId = req.user._id
  Category.find()
    .lean()
    .then(categories => {
      Record.find({ userId })
        .populate('categoryId')
        .lean()
        .sort({ _id: 'desc' })
        .then((records) => {
          let totalAmount = 0
          records.forEach(record => {
            totalAmount += record.amount
          })
          return res.render('index', { records, categories, totalAmount })
        })
    })
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categoryId
  if (!categoryId) {
    return res.redirect('/')
  }
  console.log(categoryId)
  Category.find()
    .lean()
    .then(categories => {
      categories.forEach(category => {
        if (String(category._id) === categoryId) {
          category.selected = true
        } else {
          category.selected = false
        }
      })
      Record.find({ userId, categoryId })
        .populate('categoryId')
        .lean()
        .sort({ _id: 'desc' })
        .then(records => {
          let totalAmount = 0
          records.forEach(record => {
            totalAmount += record.amount
          })
          return res.render('index', { records, categories, totalAmount })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router
