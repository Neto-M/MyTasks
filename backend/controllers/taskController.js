const Task = require('../models/Task')

module.exports = class taskController {
    static async createTask (req, res) {
        const id = req.params.id

        const newTask = {
            taskname: req.body.taskname,
            TitleId: id,
        }

        if(!newTask || '') {
            res.status(422).json({message: 'Sua lista de tarefas está vazia. Escreva uma tarefa!'})
            return
        }

        try {
            await Task.create(newTask)
            res.status(200).json({message: 'Task criada!'})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async getTask (req, res) {
        const id = req.params.id

        try {
            const task = await Task.findAll({where: {TitleId: id}})
            res.status(200).json({task: task})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async editTask (req, res) {
        const id = req.params.id
        const updateTask = {
            taskname: req.body.taskname
        }

        try {
            await Task.update(updateTask, {where: {id: id}})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async removeTask (req, res) {
        const id = req.params.id

        try {
            await Task.destroy({where: {id: id}})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}