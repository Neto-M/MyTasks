const User = require('../models/User')
const bcrypt = require('bcryptjs')
const createUserToken = require('../helpers/create-user-token')

module.exports = class userController {
    static async Login(req, res) {
        const {email, password} = req.body

        /*res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 60 * 60 * 1000
        })*/

        /*const token = req.cookies.token */
    }
}