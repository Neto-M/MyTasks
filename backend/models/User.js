const db = require('../db/conn')
const DataTypes = require('sequelize')

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        require: true,
    },
    username: {
        type: DataTypes.STRING,
        require: true,
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
})

module.exports = User