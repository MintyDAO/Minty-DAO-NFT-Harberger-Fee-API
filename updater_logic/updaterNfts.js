const getEvent = require('../web3/getEvent')
// DON"T USE OUR Light GETH NODE, USE Infura for ETH !!!
// Beacuse our light node don't have events history for listen event
const web3Provider = require('../web3/web3Provider')
const web3 = web3Provider()

module.exports = async (BlockLatest) => {
  // get all collections addresses
  // listen events for all addresses
}
