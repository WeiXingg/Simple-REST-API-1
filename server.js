require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database connected successfully'))

// Allows server to accept json as a body inside a post or get element etc
app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(5000, () => console.log('Server has started'))