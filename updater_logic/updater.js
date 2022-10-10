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
  const nftInContract = await factory.methods.totalNFTs().call()

  if(nftInContract > nftInDB){
    for(let i = nftInDB; i < nftInContract; i++){
      const address = await factory.methods.nfts(i).call()
      const collection = new web3.eth.Contract(abi.NFT_COLLECTION_ABI, i)
      const name = await collection.methods.name().call()
      const symbol = await collection.methods.symbol().call()
      const initialPrice = await collection.methods.initialPrice().call()
      const maxSupply = await collection.methods.maxSupply().call()
      
      console.log("Index ", address)
    }
  }

  console.log("BlockLatest", BlockLatest)
  console.log("Total nfts ", nftInContract)
  console.log("Count", nftInDB)
}
