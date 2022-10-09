require('dotenv').config()
const Web3 = require('web3')

// return random Infura provider
const web3GetRandomProvider = () => {
  const NODES = process.env.NODES.split(',')
  const index = getRandomInt(NODES.length)
  const randomProvider = NODES[index]
  return new Web3(randomProvider)
}

// return random int
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = web3GetRandomProvider
