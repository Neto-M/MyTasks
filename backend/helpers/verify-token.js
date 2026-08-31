const jwt = require('jsonwebtoken')
const getToken = require('./get-token')
const { ACCESS_TOKEN_KEY } = process.env

const verifyToken = async(req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({message: 'Acesso Negado'})
    }

    const token = getToken(req)

    if(!token) {
        res.status(401).json({message: 'Acesso Negado'})
    }

    try {
        const verified = jwt.verify(token, ACCESS_TOKEN_KEY)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).json({message: 'Token Inválido!'})
    }
}

module.exports = verifyToken