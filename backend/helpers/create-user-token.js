const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) => {
    const token = jwt.sign({
        user: user.username,
        id: user.id
    },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: '1h' })

    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        UserId: user.id
    })
}

module.exports = createUserToken