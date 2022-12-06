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
    const eventsObj = await getEvent(collections[i], abi.NFT_COLLECTION_ABI, fromBlock, toBlock, 'allEvents', web3)
    // Update if some events happen for this address
    if(eventsObj.length > 0) {
      for(let i =0; i < eventsObj.length; i++){
        let EventName = eventsObj[i].event
        let NftAddress = eventsObj[i].address
        let txInfo = await web3.eth.getTransaction(eventsObj[i].transactionHash)
        let UserAddress = txInfo.from
        let data = {
         "blockNumber":eventsObj[i].blockNumber,
         "transactionHash":eventsObj[i].transactionHash,
         "nft":NftAddress,
         "additionalData": eventsObj[i].returnValues
        }

        switch(EventName){
         case 'Mint':
          console.log(`
           Mint event detected
           nft id : ${data.additionalData.id}
           owner : ${data.additionalData.owner}
           nft address : ${data.nft}
           `)
          break;

          case 'Protect':
           console.log(`Protect TODO`)
          break;

          case 'ForceBuy':
           console.log(`ForceBuy TODO`)
          break;
        }
      }
    }
  }
}

// find mints event here 
test(25214353, 25219353)

// test(25219353, 25219355)
