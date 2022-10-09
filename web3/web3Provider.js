require('dotenv').config()
const Web3 = require('web3')
const web3RandomProvider = require('./web3RandomProvider')

const web3Provider = () => {
  // Comment this for case if COTRADER_NODE server will broke
  const provider = process.env.NODE_PROVIDER
  return new Web3(provider)

  // Unkoment this for case if COTRADER_NODE server will broke
  // return web3RandomProvider()
}

module.exports = web3Provider
