const web3Provider = require('../web3/web3Provider')
const web3 = web3Provider()
const updater = require('./updater')

let prevBlock = 0

module.exports = () => {
  console.log("Run http block listener")
  let timerId = setInterval(async () => runUpdates(), 3000)
}

async function runUpdates() {
  const block = await web3.eth.getBlockNumber()
  if(prevBlock !== block){
    updater(block)
    prevBlock = block
  }
}
