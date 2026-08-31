require('dotenv').config()
const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use('/')

conn.sync()
    .then(() => {app.listen(5000)})
    .catch((err) => {console.log(err)})