const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

//首頁
router.get('/', (req, res, next) => {
  const userId = req.user._id
  Record.find({userId})
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++ ){
        totalAmount += records[i].amount
      }
      return res.render('index', { records, totalAmount })
    })
    .catch((error) => console.log(error))
})

module.exports = router
