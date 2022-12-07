// restore DB after deploy api
const web3Provider = require('../web3/web3Provider')
const web3 = web3Provider()
const updaterCollections = require('./updaterCollections')
const updaterNftsByEvents = require('./updaterNftsByEvents')
const config = require('../config')

const restoreDB = async () => {
   console.log("Starting search updates ...")
   await updaterCollections()

   const currentBlock = await web3.eth.getBlockNumber()
   let updateBlock = config.FactoryCreationBlock - 5000


   setTimeout(async () => {
     // restore history
     while (updateBlock < currentBlock) {
       console.log("Search updates between blocks", updateBlock, updateBlock+5000)
       await updaterNftsByEvents(updateBlock, updateBlock+5000)
       updateBlock+=5000
     }

     // check again latest 5000
     await updaterNftsByEvents(updateBlock, currentBlock)

     // process.exit(1)
     console.log("Finished ")
   }, 10000)
   }

restoreDB()
