const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res, next) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then((records) => res.render('index', { records }))
    .catch((error) => console.log(error))
})

module.exports = router;