const Title = require('../models/Title')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')

module.exports = class titleController {
    static async createTitle (req, res) {
        const token = getToken(req)
        const {title} = req.body

        const user = await getUserByToken(token)

        if(!title || '') {
            title = 'Sem Título'
        }

        const createTitle = {
            title,
            UserId: user.id
        }

        try {
            await Title.create(createTitle)
        } catch (error) {
            res.status(422).json({message: 'Não foi possível criar sua task.'})
        }
    }

    static async getTitle (req, res) {
        const token = getToken(req)
        const user = getUserByToken(token)

        try {
            const titles = await Title.findAll({where: {UserId: user.id}})
            if(titles.length === 0) {
                res.status(200).json({message: 'Sem Tasks'})
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async editTitle (req, res) {
        const id = req.params.id
        const updateTitle = {
            title: req.body.title
        }

        if(!updateTitle || '') {
            updateTitle = 'Sem Título'
        }

        try {
            await Title.update(updateTitle, {where: {id: id}})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async removeTitle (req, res) {
        const id = req.params.id

        try {
            await Title.destroy({where: {id: id}})
            res.status(200).json({message: 'Task deletada com sucesso!'})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}