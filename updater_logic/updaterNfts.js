const getEvent = require('../web3/getEvent')
// DON"T USE OUR Light GETH NODE, USE Infura for ETH !!!
// Beacuse our light node don't have events history for listen event
const web3Provider = require('../web3/web3Provider')
const web3 = web3Provider()

const config = require('../config')
const abi = require('../abi')

// module.exports = async (BlockLatest) => {
const test = async(fromBlock, toBlock) => {
  // get all collections addresses
  const factory = new web3.eth.Contract(abi.NFT_FACTORY_ABI, config.NFT_FACTORY)
  const collections = await factory.methods.getAllCollections().call()

  console.log(collections)

  // (address, abi, fromBlock, toBlock, eventName, web3)

  // listen events for all addresses

  for(let i = 0; i < collections.length; i++) {
    data = await getEvent(collections[i], abi.NFT_COLLECTION_ABI, fromBlock, toBlock, 'allEvents', web3)

    console.log(data)
  }
}

test(25214353, 25219353)
