require('dotenv').config()
const web3RandomProvider = require('../web3/web3RandomProvider')
const getEvent = require('../web3/getEvent')
const config = require('../config')
const _ = require('lodash')
const mysql = require('../mysql')
const eventsUpdater = require('../helpers/eventsUpdater')

// DON"T USE OUR OWN GETH NODE, USE Infura for ETH !!!
// Beacuse our own node don't have events history
const Web3 = require('web3')
const web3 = new Web3(process.env.NODE_PROVIDER)


// Search NFTCreated event in each new block - 5 blocks for ensure
module.exports = async (BlockLatest) => {
  console.log("BlockLatest", BlockLatest)
  console.log("Should check updates here ")
}
