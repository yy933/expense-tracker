const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/new', (req, res, next) => {
  return res.render('new')
})
router.post('/', (req, res, next) => {
  const {itemName, amount, category, date} = req.body
  // const categoryId = req.category._id
  const userId = req.user._id;
  const newRecord = new Record({ itemName, amount, category, date, userId })
  const errors = [];
  if (!itemName || !amount || !category || !date) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if ( amount <= 0 ) {
    errors.push({ message: "金額必須至少為1元" });
  }
  if (errors.length) {
    return res.render("new", {
      errors,
      itemName,
      amount,
      date,
      category
    });
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
  return Record.findOne({_id, userId})
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch((error) => {
      console.log(error)
    })
})
router.put('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  const contents = req.body
  return Record.findOneAndUpdate({_id, userId}, contents, { new: true })
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOneAndRemove({_id, userId})
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
