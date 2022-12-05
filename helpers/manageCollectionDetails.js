const mysql = require('../mysql')
const parseSqlResult = require('./parseSqlResult')

module.exports = async (nftAddress, nftId, protectionTime, ipfsHash, format, address, isMintable) => {
  const request = parseSqlResult(await mysql.getCollectionDetails(nftAddress))
  const dataJson = request.length > 0 ? JSON.parse(request[0]['nfts']) : {}
  // should update collection
  if(dataJson.hasOwnProperty(nftAddress)){

    dataJson.filter(item => {
      // update if such nft exist
      if(item.nftId === nftId){
        item.protectionTime = protectionTime
      }
      // insert new nft
      else{
        dataJson.push(
          {nftId, protectionTime, ipfsHash, format, address, isMintable}
        )
      }
    });

    return await mysql.updateCollectionDetails(nftAddress, dataJson)
  }
  // should insert collection
  else{
    const dataJson =
      [
        {nftId, protectionTime, ipfsHash, format}
      ]

    return await mysql.insertCollectionDetails(nftAddress, dataJson)
  }
}
