const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getUserByToken = async (token) => {
    if(!token) {
        console.log('Sem Token')
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        const UserId = decoded.userId
        const user = await User.findOne({where: {id: UserId}})
        return user
    } catch (error) {
        console.log(error)
    }
}

module.exports = getUserByToken