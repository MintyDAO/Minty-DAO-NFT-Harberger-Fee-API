module.exports = (nftAddress, nftId, dataArray) => {
  const removeIndex = dataArray.indexOf(dataArray.find(element => element[nftAddress]))

  if(removeIndex >= 0)
    dataArray.splice(removeIndex, 1)
    
  return dataArray
}
