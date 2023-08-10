const Record = require('../models/Record')
const Category = require('../models/Category')
const moment = require('moment')
const recordValidator = require('../helpers/record-validator')
const recordController = {
  getAddNewRecord: (req, res, next) => {
    Category.find()
      .lean()
      .then(categories => {
        return res.render('new', { categories })
      })
      .catch(error => {
        console.log(error)
        next(error)
      })
  },
  addNewRecord: (req, res, next) => {
    Category.find()
      .lean()
      .then(categories => {
        const { itemName, amount, categoryId, date } = req.body
        const userId = req.user._id
        const newRecord = new Record({
          itemName,
          amount,
          categoryId,
          date,
          userId
        })
        categories.forEach((category) => {
          if (String(category._id) === categoryId) {
            category.selected = true
          }
        })
        const errors = recordValidator(itemName, amount, categoryId, date)
        if (errors.length) {
          return res.render('new', {
            errors,
            itemName,
            amount,
            date,
            categories
          })
        }
        return newRecord
          .save()
          .then(req.flash('success_msg', '成功新增支出!'))
          .then(() => res.redirect('/'))
          .catch(error => {
            console.log(error)
            next(error)
          })
      })
      .catch(error => {
        console.log(error)
        next(error)
      })
  },
  getEditRecord: (req, res, next) => {
    const _id = req.params.id
    const userId = req.user._id
    Category.find()
      .lean()
      .then(categories => {
        Record.findOne({ _id, userId })
          .lean()
          .then(record => {
            categories.forEach(category => {
              if (String(category._id) === String(record.categoryId)) {
                category.selected = true
              }
            })
            record.date = moment(record.date).format('YYYY-MM-DD')
            return res.render('edit', { record, categories })
          })
          .catch(error => {
            console.log(error)
            next(error)
          })
      })
  },
  editRecord: (req, res, next) => {
    Category.find()
      .lean()
      .then(categories => {
        const _id = req.params.id
        const userId = req.user._id
        const { itemName, date, categoryId, amount } = req.body
        categories.forEach(category => {
          if (String(category._id) === categoryId) {
            category.selected = true
          }
        })
        const errors = recordValidator(itemName, amount, categoryId, date)
        if (errors.length) {
          return Record.findOne({ _id, userId })
            .lean()
            .then(record => {
              record.date = moment(record.date).format('YYYY-MM-DD')
              res.render('edit', { errors, record, categories })
            })
            .catch(error => console.log(error))
        }
        return Record.findOneAndUpdate({ _id, userId },
          { itemName, date, categoryId, amount, userId },
          { new: true })
          .then(req.flash('success_msg', '成功修改支出!'))
          .then(() => res.redirect('/'))
          .catch(error => {
            console.log(error)
            next(error)
          })
      })
      .catch(error => {
        console.log(error)
        next(error)
      })
  },
  deleteRecord: (req, res, next) => {
    const _id = req.params.id
    const userId = req.user._id
    return Record.findOneAndRemove({ _id, userId })
      .then(req.flash('success_msg', '成功刪除支出!'))
      .then(() => res.redirect('/'))
      .catch(error => {
        console.log(error)
        next(error)
      })
  }

}

module.exports = recordController
