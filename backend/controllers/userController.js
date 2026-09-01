const User = require('../models/User')
const bcrypt = require('bcryptjs')
const createUserToken = require('../helpers/create-user-token')

module.exports = class userController {
    static async Login(req, res) {
        const {email, password} = req.body

        if(!email) {
            res.status(422).json({message: 'O E-mail é obrigatório!'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A Senha é obrigatória!'})
            return
        }

        const user = await User.findOne({where: {email: email}})
        if(!user) {
            res.status(422).json({message: 'E-mail ou Senha inválidos!'})
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) {
            res.status(422).json({message: 'E-mail ou Senha inválidos!'})
            return
        }

        const token = await createUserToken(user, req, res)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 60 * 60 * 1000
        })

        /*const token = req.cookies.token */
    }

    static async Register(req, res) {
        const {email, username, password, confirmpassword} = req.body

        if(!email) {
            res.status().json({message: 'O E-mail é obrigatório!'})
            return
        }

        const emailExist = await User.findOne({where: {email: email}})
        if(emailExist) {
            res.status(422).json({message: 'O E-mail já está cadastrado!'})
            return
        }

        if(!username) {
            res.status().json({message: 'O usuário é obrigatório!'})
            return
        }

        const userExist = await User.findOne({where: {username: username}})
        if(userExist) {
            res.status(422).json({message: 'O usuário já está em uso!'})
            return
        }

        if(!password) {
            res.status().json({message: 'A Senha é obrigatória!'})
            return
        }

        if(!confirmpassword) {
            res.status().json({message: 'A confirmação de senha é obrigatória!'})
            return
        }

        if(password != confirmpassword) {
            res.status(422).json({message: 'A Senha e a Confirmação de senha são diferentes!'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = {
            email,
            username,
            password: passwordHash,
        }

        try {
            const newUser = await User.create(user)
            const token = await createUserToken(newUser, req, res)
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 60 * 60 * 1000
            })
            res.status(422).json({message: 'Cadastro realizado com sucesso!'})
        } catch (error) {
            res.status(500).json({message: `Erro: ${error}`})
        }
    }
}