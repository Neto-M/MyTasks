const Title = require('../models/Title')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class titleController {
    static async createTitle (req, res) {
        const token = req.cookies.token
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

    }

    static async editTitle (req, res) {

    }

    static async removeTitle (req, res) {

    }
}