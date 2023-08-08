const express = require('express')
const router = express.Router()
const recordController = require('../../controllers/recordController')

router.get('/new', recordController.getAddNewRecord)
router.post('/new', recordController.addNewRecord)

router.get('/:id/edit', recordController.getEditRecord)
router.put('/:id', recordController.editRecord)
router.delete('/:id', recordController.deleteRecord)

module.exports = router
