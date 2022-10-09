/**
 * This function return event object of certain event hapen in the interim fromBlock to Latest
 * @param {ETH address} address  .
 * @param {Contract ABI} abi.
 * @param {ETH block number} fromBlock set certain FromBlock.
 * @param {eventName} eventName set certain event name like Deposit, Trade ect.
 * @param {web3} web3 provider
 */

module.exports = async (address, abi, fromBlock, toBlock, eventName, web3) => {
const isAddress =	web3.utils.isAddress(address)
if(isAddress){
const contract = new web3.eth.Contract(abi, address)

 try {
   let getEvent = await contract.getPastEvents(
    eventName,
    {
      fromBlock,
      toBlock
    }
   )
  return getEvent
  }
  catch(err){
  return new Error(err);
}
}
else{
	return new Error("Not correct address");
}
}
