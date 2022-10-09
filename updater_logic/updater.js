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
  // address, abi, fromBlock, toBlock, eventName, web3
  let eventsObj = await getEvent(config.NFT, config.NFTABI, BlockLatest - 5, 'latest', 'allEvents', web3)

  if(!_.isEmpty(eventsObj)){
  for(let i =0; i < eventsObj.length; i++){

  const EventName = eventsObj[i].event
  const txInfo = await web3.eth.getTransaction(eventsObj[i].transactionHash)
  const UserAddress = txInfo.from


  await eventsUpdater(EventName, eventsObj, mysql, i)
  }
 }
}
