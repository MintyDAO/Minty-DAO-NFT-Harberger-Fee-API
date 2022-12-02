require('dotenv').config()
const web3RandomProvider = require('../web3/web3RandomProvider')
const getEvent = require('../web3/getEvent')
const config = require('../config')
const abi = require('../abi')
const _ = require('lodash')
const mysql = require('../mysql')
const eventsUpdater = require('../helpers/eventsUpdater')

// DON"T USE OUR OWN GETH NODE, USE Infura for ETH !!!
// Beacuse our own node don't have events history
const Web3 = require('web3')
const web3 = new Web3(process.env.NODE_PROVIDER)

// Search NFTCreated event in each new block - 5 blocks for ensure
module.exports = async (BlockLatest) => {
  const factory = new web3.eth.Contract(abi.NFT_FACTORY_ABI, config.NFT_FACTORY)
  const nftInDB = await mysql.countCollections()
  const nftInContract = await factory.methods.totalCollections().call()

  if(nftInContract > nftInDB){
    for(let i = nftInDB; i < nftInContract; i++){
      const address = await factory.methods.collections(i).call()
      const collection = new web3.eth.Contract(abi.NFT_COLLECTION_ABI, address)
      const name = await collection.methods.name().call()
      const symbol = await collection.methods.symbol().call()

      // versions conflict

      let initialPrice
      let ipfsHash
      let isMintable
      let format
      let maxSupply
      let uri

      try{
        initialPrice = await collection.methods.initialPrice().call()
        ipfsHash = await collection.methods.ipfsHash().call()
        format = await collection.methods.format().call()
        maxSupply = await collection.methods.maxSupply().call()
        uri = await collection.methods.uri().call()
        isMintable = 1
      }catch(e){
        initialPrice = 0
        ipfsHash = ""
        format = ""
        maxSupply = 0
        uri = ""
        isMintable = 0
      }

      await mysql.insertNewCollection(
        address,
        name,
        symbol,
        initialPrice,
        uri,
        maxSupply,
        format,
        ipfsHash
      )
    }
    console.log("Insert new collection")
  }
}
