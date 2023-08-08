const express = require('express')
const router = express.Router()
const homeController = require('../../controllers/homeController')

router.get('/', homeController.getHome)
router.get('/sort', homeController.getSort)

module.exports = router
