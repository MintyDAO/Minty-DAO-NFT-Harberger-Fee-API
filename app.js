require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router')

const http = require('http').createServer(app)
const io = module.exports.io = require('socket.io')(http)
const socketManager = require('./socketManager')

const bodyParser = require('body-parser')
const cors = require('cors')
// wss
const mainUpdater = require('./updater_logic/mainUpdater')
const memoryController = require('./memoryController')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 9007

app.use('/api', router)

io.on('connection', socketManager)

http.listen(port)
console.log('Listening on port ' + port + " Version 22/09/21")


// Update smartfunds data when new Block was created
// Use interval and http instead wss
mainUpdater()

// Reload app automaticly if there is little memory
memoryController()
