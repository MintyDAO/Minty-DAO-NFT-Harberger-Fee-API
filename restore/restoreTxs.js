require('dotenv').config()
const config = require('../config')
const _ = require('lodash')
const mysql = require('../mysql')
const getEvent = require('../web3/getEvent')
const eventsUpdater = require('../helpers/eventsUpdater')

// DON"T USE OUR OWN GETH NODE, USE Infura for ETH !!!
// Beacuse our own node don't have events history
const Web3 = require('web3')
const web3 = new Web3(process.env.NODE_PROVIDER)
const blockRange = 5000


/**
* This function restore all user tx and fund shares in DB from block - 0
* more info in README
*/

const restore = async (fromBlock, toBlock) => {
  console.log("Running restore process between blocks ", fromBlock, toBlock)
  try{
    let eventsObj = await getEvent(config.NFT, config.NFTABI, fromBlock, toBlock, 'allEvents', web3)

    // Update if some events happen for this address
    if(!_.isEmpty(eventsObj)){
    for(let i =0; i < eventsObj.length; i++){

     let EventName = eventsObj[i].event
     let txInfo = await web3.eth.getTransaction(eventsObj[i].transactionHash)
     let UserAddress = txInfo.from

     await eventsUpdater(EventName, eventsObj, mysql, i)
    }
   }
  }
  catch(e){
    console.log("Can't restore tx, trying reconnect to another provider and try again", e)
    // restore(block)
  }
}


module.exports = async () => {
  const latestBlock = await web3.eth.getBlockNumber()
  let fromBlock = Number(process.env.FROM_BLOCK)
  let toBlock = fromBlock + blockRange

  while (fromBlock <= latestBlock) {
  await restore(fromBlock, toBlock)
  fromBlock += blockRange
  toBlock += blockRange
  }

  console.log(fromBlock, latestBlock)
  // process.exit(1)
}
