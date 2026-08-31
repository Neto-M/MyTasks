const DataTypes = require('sequelize')
const db = require('../db/conn')
const User = require('./User')

const Title = db.define('Title', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Title.belongsTo(User)
User.hasMany(Title)

module.exports = Title