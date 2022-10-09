const express = require('express')
const mysql = require('./mysql')
const router = express.Router()

// const store = require('store')



router.get('/', function(req, res) {
    res.json({ message: 'API is Online!' })
})

router.route('/nfts/').get(async (req, res) => {
  const result = await mysql.getAllNFTSInDB()
  res.json({ result })
})

router.route('/nft/:index').get(async (req, res) => {
  const result = await mysql.getNFT(req.params.index)
  res.json({ result })
})

router.route('/reserve-token/').post(async (req, res) => {
  if(req.headers.authorization === 'Bearer ' + process.env.AUTH_TOKEN){

    const result = await mysql.updateNFTValue(
      "tokenReservedTime",
       Math.floor(Date.now() / 1000),
       req.body.tokenIndex,
       false
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
