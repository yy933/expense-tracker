const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/new', (req, res, next) => {
  return res.render('new')
})
router.post('/', (req, res, next) => {
  const contents = req.body
  const newRecord = new Record({ ...contents })
  newRecord
    .save()
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch((error) => {
      console.log(error)
    })
})
router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const contents = req.body
  return Record.findByIdAndUpdate(id, contents, { new: true })
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  return Record.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
