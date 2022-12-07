const web3Provider = require('../web3/web3Provider')
const web3 = web3Provider()
const updaterCollections = require('./updaterCollections')
const updaterNftsByEvents = require('./updaterNftsByEvents')

let prevBlock = 0

module.exports = () => {
  console.log("Run updater by http block listener")
  let timerId = setInterval(async () => runUpdates(), 3000)
}

// search updates in each block
async function runUpdates() {
  const block = await web3.eth.getBlockNumber()
  if(prevBlock !== block){
    // update collections
    await updaterCollections()
    // update nfts
    await updaterNftsByEvents(block-3, block)
    prevBlock = block
  }
}
