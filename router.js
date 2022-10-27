const express = require('express')
const mysql = require('./mysql')
const router = express.Router()
const manageCollectionDetails = require('./helpers/manageCollectionDetails')

// const store = require('store')

router.get('/', function(req, res) {
    res.json({ message: 'API is Online!' })
})

router.route('/collections/').get(async (req, res) => {
  const result = await mysql.getAllCollections()
  res.json({ result })
})

router.route('/collection/:address').get(async (req, res) => {
  const result = await mysql.getCollection(req.params.address)
  res.json({ result })
})

router.route('/update-collection/').post(async (req, res) => {
  if(req.headers.authorization === 'Bearer ' + process.env.AUTH_TOKEN){

    const result = await mysql.manageCollectionDetails(
       req.body.nftAddress,
       req.body.nftId,
       req.body.protectionTime
     )

    switch(result) {
      case 'Ok':
      res.status(200).send("Ok")
      break

      default:
      res.status(500).send("Internal Server Error")
      break
    }
  }
  else{
    res.status(401).send("Unauthorized")
  }
})

// NO NEED because we upadte this via events

// router.route('/buy-token/').post(async (req, res) => {
//   if(req.headers.authorization === 'Bearer ' + process.env.AUTH_TOKEN){
//
//     const result = await mysql.updateNFTValue(
//       "tokenIndexUsed",
//        1,
//        req.body.tokenIndex,
//        false
//      )
//
//     switch(result) {
//       case 'Ok':
//       res.status(200).send("Ok")
//       break
//
//       default:
//       res.status(500).send("Internal Server Error")
//       break
//     }
//   }
//   else{
//     res.status(401).send("Unauthorized")
//   }
// })


module.exports = router
