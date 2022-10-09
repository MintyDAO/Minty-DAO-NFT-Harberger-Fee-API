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
// const BlockListener = require('./updater_logic/BlockListener')
const BlockListenerHttp = require('./updater_logic/BlockListenerHttp')
const memoryController = require('./memoryController')
const restoreTxs = require('./restore/restoreTxs')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 9007

app.use('/api', router)

io.on('connection', socketManager)

http.listen(port)
console.log('Listening on port ' + port + " Version 22/09/21")

// Restore all txs
restoreTxs()

// Update smartfunds data when new Block was created
// BlockListener
// Use interval and http instead wss
BlockListenerHttp()

// Reload app automaticly if there is little memory
memoryController()
