const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res, next) => {
  const userId = req.user._id
  Record.find({userId})
    .lean()
    .sort({ date: 'desc' })
    .then((records) => res.render('index', { records }))
    .catch((error) => console.log(error))
})

module.exports = router
