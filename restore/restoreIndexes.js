require('dotenv').config()
const mysql = require('../mysql')


const restore = async () => {
  console.log("restore start")
  for(let i = 0; i < process.env.TOTAL_NFT_INDEXES; i++){
    await mysql.insertNewIndex(i, 0, 0, "0x", 0, "0")
  }
  console.log("restore finish")
  process.exit(1)
}

restore()
