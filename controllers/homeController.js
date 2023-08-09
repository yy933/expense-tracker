const Record = require('../models/Record')
const Category = require('../models/Category')
const moment = require('moment')

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
    let orderOption
    if (orderBy === 'date-desc') {
      orderOption = { date: 'desc' }
    } else if (orderBy === 'date-asc') {
      orderOption = { date: 'asc' }
    } else if (orderBy === 'amount-desc') {
      orderOption = { amount: 'desc' }
    } else if (orderBy === 'amount-asc') {
      orderOption = { amount: 'asc' }
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
        Record.find({
          userId,
          ...(categoryId !== 'all') ? { categoryId } : {},
          ...(startDate && endDate) ? { date: { $gte: startDate, $lte: endDate } } : {}
        })
          .populate('categoryId')
          .lean()
          .sort(orderOption)
          .then(records => {
            let totalAmount = 0
            records.forEach(record => {
              totalAmount += record.amount
              record.date = moment(record.date).format('YYYY/MM/DD')
            })
            return res.render('index', { records, categories, categoryId, totalAmount, orderBy, startDate, endDate })
          })
      })
      .catch(error => console.error(error))
  }

}

module.exports = homeController
