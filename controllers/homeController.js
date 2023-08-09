const moment = require('moment')
const Record = require('../models/Record')
const Category = require('../models/Category')

const homeController = {
  getHome: (req, res, next) => {
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
              record.date = moment(record.date).format('YYYY/MM/DD')
            })
            return res.render('index', { records, categories, totalAmount })
          })
      })
      .catch(error => console.log(error))
  },
  getSort: (req, res, next) => {
    const userId = req.user._id
    const { categoryId, startDate, endDate, orderBy } = req.query
    if (!categoryId) {
      return res.redirect('/')
    }
    console.log(req.query)
    Category.find()
      .lean()
      .then(categories => {
        categories.forEach(category => {
          if (String(category._id) === categoryId) {
            category.selected = true
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
              record.date = moment(record.date).format('YYYY/MM/DD')
            })
            return res.render('index', { records, categories, totalAmount })
          })
      })
      .catch(error => console.error(error))
  }

}

module.exports = homeController
