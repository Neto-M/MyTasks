const express = require('express')
const router = express.Router()
const titleController = require('../controllers/titleController')
const verifyToken = require('../helpers/verify-token')

router.post('/title', verifyToken, titleController.createTitle)
router.get('/title', verifyToken, titleController.getTitle)
router.patch('/title/edit/:id', verifyToken, titleController.editTitle)
router.delete('/title/remove/:id', verifyToken, titleController.removeTitle)

module.exports = router