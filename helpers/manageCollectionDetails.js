const mysql = require('../mysql')
const parseSqlResult = require('./parseSqlResult')

// What this script do
// insert new collection
// update exist collection
// insert new nft
// update exist nft (update only protactionTime)

module.exports = async (
  nftAddress,
  nftId,
  protectionTime,
  owner,
  ipfsHash=null,
  format=null,
  address=null,
  isMintable=null
) => {
  const request = parseSqlResult(await mysql.getCollectionDetails(nftAddress))
  const dataJson = request.length > 0 ? JSON.parse(request[0]['nfts']) : {}

  // should update collection
  if(Object.keys(dataJson).length !== 0) {
    const ids = dataJson.map(i => i.nftId)
    // update protection time if such nft exist in list
    if(ids.includes(nftId)){
      dataJson.filter(item => {
        if(item.nftId === nftId){
          item.protectionTime = protectionTime
          item.owner = owner
        }
      })
    }
    // insert new nft
    else{
      dataJson.push(
        {nftId, protectionTime, owner, ipfsHash, format, address, isMintable}
      )
    }
    return await mysql.updateCollectionDetails(nftAddress, dataJson)
  }
  // should insert new collection
  else{
    const dataJson =
      [
        {nftId, protectionTime, owner, ipfsHash, format, address, isMintable}
      ]

    return await mysql.insertCollectionDetails(nftAddress, dataJson)
  }
}
