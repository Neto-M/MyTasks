const DataTypes = require('sequelize')
const db = require('../db/conn')
const Title = require('./Title')

const Task = db.define('Task', {
    taskname: {
        type: DataTypes.STRING,
        require: true,
    }
})

Task.belongsTo(Title)
Title.hasMany(Task)

module.exports = Task