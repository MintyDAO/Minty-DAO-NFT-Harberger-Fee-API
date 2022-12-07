// restore DB after deploy api
const web3Provider = require('../web3/web3Provider')
const web3 = web3Provider()
const updaterCollections = require('./updaterCollections')
const updaterNftsByEvents = require('./updaterNftsByEvents')
const config = require('../config')

const restoreDB = async () => {
   await updaterCollections()

   const currentBlock = await web3.eth.getBlockNumber()
   let updateBlock = config.FactoryCreationBlock


   setTimeout(async () => {
     // restore history
     while (updateBlock < currentBlock) {
       await updaterNftsByEvents(updateBlock, currentBlock)
       updateBlock+=5000
     }

     // check again latest 5000
     await updaterNftsByEvents(updateBlock, currentBlock)

     // process.exit(1)
   }, 10000)
   }

restoreDB()
