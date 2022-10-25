module.exports = (nftAddress, nftId, protectionTime, dataArray) => {

  const index = dataArray.indexOf(dataArray.find(element => element[nftAddress]))

  // if such collection exist, update
  if(index >= 0){
    dataArray[index][nftAddress].push(
      { nftId, protectionTime }
    )
  }
  // create
  else{
    dataArray.push(
      {
        [nftAddress]:[
          { nftId, protectionTime }
        ]
      }
    )
  }

  // return result
  return dataArray
}
