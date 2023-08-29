const Record = require('../models/record')
const Category = require('../models/Category')
const moment = require('moment')
const recordValidator = require('../helpers/record-validator')
const ObjectId = require('mongodb').ObjectId
const generateCSV = require('../helpers/write-csv')

const recordController = {
  getAddNewRecord: (req, res, next) => {
    Category.find()
      .lean()
      .then(categories => {
        return res.render('records/new', { categories })
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
          return res.render('records/new', {
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
            return res.render('records/edit', { record, categories })
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
              res.render('records/edit', { errors, record, categories })
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
  },
  getStats: async (req, res, next) => {
    try {
      const { userId } = req.params
      const { startDate, endDate } = req.query
      if (String(req.user._id) !== userId) {
        return res.redirect('/user/login')
      }
      const records = await Record.aggregate([
        {
          $match: {
            userId: ObjectId(userId),
            ...(startDate && endDate) ? { date: { $gte: new Date(startDate), $lte: new Date(endDate) } } : {}
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $set: {
            category: '$category.name',
            icon: '$category.url'
          }
        },
        {
          $unwind: '$category'
        },
        {
          $unwind: '$icon'
        },
        {
          $facet: {
            totalAmountOfAllDocs: [
              {
                $group: {
                  _id: 0,
                  totalAmountOfAllDocs: { $sum: '$amount' }
                }
              }
            ],
            groupByCategory: [
              {
                $group: {
                  _id: '$category',
                  totalAmount: { $sum: '$amount' },
                  icon: { $first: '$icon' }
                }
              }
            ]
          }
        },
        {
          $addFields: {
            totalAmountOfAllDocs: {
              $arrayElemAt: ['$totalAmountOfAllDocs', 0]
            }
          }
        },
        {
          $unwind: '$groupByCategory'
        },
        {
          $project: {
            _id: 0,
            category: '$groupByCategory._id',
            icon: '$groupByCategory.icon',
            totalAmount: '$groupByCategory.totalAmount',
            percentage: {
              $multiply: [
                {
                  $divide: [
                    '$groupByCategory.totalAmount',
                    '$totalAmountOfAllDocs.totalAmountOfAllDocs'
                  ]
                }, 100
              ]
            }
          }
        }
      ])

      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.totalAmount
        record.percentage = record.percentage.toFixed(1)
      })
      // remove icon column from records and generate csv file
      const csvRecords = records.map(record => {
        const { icon, ...others } = record
        others.date = moment(startDate).format('YYYY/MM/DD') + '-' + moment(endDate).format('YYYY/MM/DD')
        return others
      })
      generateCSV(csvRecords, userId)
      return res.render('records/stats', {
        records,
        totalAmount,
        startDate,
        endDate,
        userId
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}

module.exports = recordController
