const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'mytasks', 'root', process.env.DB_KEY, {
        host: 'localhost',
        dialect: 'mysql'
    }
)

try {
    sequelize.authenticate()
    console.log('Banco de dados conectado com sucesso!')
} catch (error) {
    console.log(`Não foi possível conectar: ${error}`)
}

module.exports = sequelize