const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/new', (req, res, next) => {
  Category.find()
    .lean()
    .then(categories => {
      return res.render('new', { categories })
    })
})
router.post('/new', (req, res, next) => {
  const { itemName, amount, categoryId, date } = req.body
  const userId = req.user._id
  const newRecord = new Record({ itemName, amount, categoryId, date, userId })
  const errors = []
  if (!itemName || !amount || !categoryId || !date) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (amount <= 0) {
    errors.push({ message: '金額必須至少為1元' })
  }
  if (errors.length) {
    return res.render('new', {
      errors,
      itemName,
      amount,
      date,
      categoryId
    })
  }
  newRecord
    .save()
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})
router.get('/:id/edit', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  Category.find()
    .lean()
    .then((categories) => {
      Record.findOne({ _id, userId })
        .lean()
        .then(record => {
          categories.forEach((category) => {
            if (String(category._id) === String(record.categoryId)) {
              category.selected = true
            } else {
              category.selected = false
            }
          })
          return res.render('edit', { record, categories })
        })
        .catch((error) => console.log(error))
    })
})
router.put('/:id', (req, res, next) => {
  Category.find()
    .lean()
    .then((categories) => {
      const _id = req.params.id
      const userId = req.user._id
      const { itemName, date, categoryId, amount } = req.body
      const errors = []
      categories.forEach(category => {
        if (String(category._id) === categoryId) {
          category.selected = true
        } else {
          category.selected = false
        }
      })
      if (!itemName || !amount || !categoryId || !date) {
        errors.push({ message: '所有欄位都是必填。' })
      }
      if (amount <= 0) {
        errors.push({ message: '金額必須至少為1元' })
      }
      if (errors.length) {
        return Record.findOne({ _id, userId })
          .lean()
          .then(record => {
            res.render('edit', { errors, record, categories })
          })
          .catch(error => console.log(error))
      }
      return Record.findOneAndUpdate(
        { _id, userId },
        { itemName, date, categoryId, amount, userId },
        { new: true }
      ).then(() => res.redirect('/')).catch(error => console.log(error))
    })
    .catch((error) => console.log(error))
})

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOneAndRemove({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
