const mysql = require('../mysql')
const parseSqlResult = require('./parseSqlResult')

module.exports = async (nftAddress, nftId, protectionTime) => {
  const request = parseSqlResult(await mysql.getCollectionDetails(nftAddress))
  const dataJson = request.length > 0 ? JSON.parse(request[0]['nfts']) : {}
  // should update
  if(dataJson.hasOwnProperty(nftAddress)){

    dataJson[nftAddress].filter(item => {
      // update if such nft exist
      if(item.nftId === nftId){
        item.protectionTime = protectionTime
      }
      // insert new nft
      else{
        dataJson[nftAddress].push(
          {nftId, protectionTime}
        )
      }
    });

    return await mysql.updateCollectionDetails(nftAddress, dataJson)
  }
  // should insert
  else{
    const dataJson = {
      [nftAddress]:[
        {nftId, protectionTime}
      ]
    }

    return await mysql.insertCollectionDetails(nftAddress, dataJson)
  }
}
