const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const verifyToken = require('../helpers/verify-token')

router.post('/task', verifyToken, taskController.createTask)
router.get('/task', verifyToken, taskController.getTask)
router.patch('/task/edit/:id', verifyToken, taskController.editTask)
router.delete('/task/remove/:id', verifyToken, taskController.removeTask)

module.exports = router