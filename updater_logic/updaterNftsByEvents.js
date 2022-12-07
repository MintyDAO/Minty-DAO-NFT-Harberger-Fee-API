const getEvent = require('../web3/getEvent')
// DON"T USE OUR Light GETH NODE, USE Infura for ETH !!!
// Beacuse our light node don't have events history for listen event
const web3Provider = require('../web3/web3Provider')
const web3 = web3Provider()

const config = require('../config')
const abi = require('../abi')
const manageCollectionDetails = require('../helpers/manageCollectionDetails')

module.exports = async (fromBlock, toBlock) => {
  // get all collections addresses
  const factory = new web3.eth.Contract(abi.NFT_FACTORY_ABI, config.NFT_FACTORY)
  const collections = await factory.methods.getAllCollections().call()

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
           console.log(`Mint event detected`)

           const { ipfsHash, format, isMintable } = await getNftInfo(web3, data.nft)

           // insert
           await manageCollectionDetails(
              data.nft, // collection
              data.additionalData.id, // nftId,
              0, // protectionTime,
              data.additionalData.owner, // owner
              ipfsHash,
              format,
              data.nft, // address,
              isMintable
           )
          break;

          case 'Protect':
           console.log(`Protect event detected`)
            // update
            await manageCollectionDetails(
               data.nft, // collection
               data.additionalData.id, // nftId,
               Number(data.additionalData.fromTime) + 31536000, // protectionTime
               data.additionalData.owner, // owner
            )
          break;

          case 'ForceBuy':
          console.log(`Force buy event detected`)
           // update
           await manageCollectionDetails(
              data.nft, // collection
              data.additionalData.id, // nftId,
              0, // protectionTime
              data.additionalData.newOwner, // owner
           )
          break;
        }
      }
    }
  }
}

const getNftInfo = async (web3, nftAddees) => {
  const contract = new web3.eth.Contract(abi.NFT_COLLECTION_ABI, nftAddees)
  let ipfsHash, format, isMintable

  try{
    ipfsHash = await contract.methods.ipfsHash().call()
    format = await contract.methods.format().call()
    isMintable = 1
  }catch(e){
    ipfsHash = ""
    format = ""
    isMintable = 0
  }

  return { ipfsHash, format, isMintable }
}
