require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const package = require('../package.json')
const routes = require('./routes')

const {env: {MONGO_URL} } = process

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        const { PORT } = process.env
        const app = express()
        const http = require('http').Server(app)
        const io = require('socket.io')(http)

        app.use(cors())
        app.use('/api', routes)
        app.io = io

        io.on('connection', socket =>{
            console.log('connection established')

            socket.on('update price', () => {
                io.sockets.emit('fetch price')
              })

        })

        http.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))
    })
    .catch(err => console.log(err))