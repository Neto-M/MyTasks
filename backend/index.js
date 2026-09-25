require('dotenv').config()
const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')
const userRoutes = require('./routes/userRoutes')
const titleRoutes = require('./routes/titleRoutes')
const taskRoutes = require('./routes/taskRoutes')
//const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use('/', userRoutes, titleRoutes, taskRoutes)

conn.sync()
    .then(() => {app.listen(5000)})
    .catch((err) => {console.log(err)})