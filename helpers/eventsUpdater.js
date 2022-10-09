module.exports = async (EventName, eventsObj, mysql, i) => {
  if(EventName === 'NFTCreated'){
    console.log("Update NFTCreated for index", eventsObj[i].returnValues[0])
    await mysql.updateNFTValue("tokenIndexUsed", 1, eventsObj[i].returnValues[0], false)
  }
  else if(EventName === 'Transfer'){
    console.log("Update Transfer for index", eventsObj[i].returnValues[2])
    await mysql.updateNFTValue("owner", eventsObj[i].returnValues[1], eventsObj[i].returnValues[2], false)
  }
  else if(EventName === 'NFTOffered'){
    console.log("Update Offer for index", eventsObj[i].returnValues[0])
    await mysql.updateNFTValue("isOffered", 1, eventsObj[i].returnValues[0], false)
    await mysql.updateNFTValue("offerPrice", eventsObj[i].returnValues[1], eventsObj[i].returnValues[0], false)
  }
  else if(EventName === 'NFTNoLongerForSale'){
    console.log("Update NFTNoLongerForSale for index", eventsObj[i].returnValues[0])
    await mysql.updateNFTValue("isOffered", 0, eventsObj[i].returnValues[0], false)
  }
  else {
    console.log(`Unknown event ${EventName} for update`)
  }
}
