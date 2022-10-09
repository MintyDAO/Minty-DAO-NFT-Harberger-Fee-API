require('dotenv').config()
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.NODE_WSS_ETH)); //ext user
const updater = require('./updater')

/*
* This function run updater each time when new block was created
*/

module.exports = () => web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        console.log("new block timestamp", result.timestamp);
        return;
    }
    console.error(error);
})
.on("data", function(blockHeader){
  updater(blockHeader.number);
})
.on('disconnect', function() {
  process.exit(1)
})
.on("error", () => {
  process.exit(1)
});
