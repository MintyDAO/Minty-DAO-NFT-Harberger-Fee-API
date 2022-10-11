const mysql = require('mysql')
const _ = require('lodash')
const util = require('util')
require('dotenv').config()

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
});

const query = util.promisify(connection.query).bind(connection);


exports.insertNewCollection = async (
  address,
  name,
  symbol,
  initialPrice,
  uri,
  maxSupply,
  format
) => {
  const q = `INSERT IGNORE INTO collections (
    address,
    name,
    symbol,
    initialPrice,
    uri,
    maxSupply,
    format
  ) VALUES (?)`
  const values = [
    address,
    name,
    symbol,
    initialPrice,
    uri,
    maxSupply,
    format
  ]
  try {
    await query(q, [values])
    return "Ok"
  } catch(err) {
    throw err
  }
}

exports.countCollections = async () => {
  const q = "SELECT COUNT(address) FROM collections"
  try {
    const rows = await query(q)
    return rows[0]['COUNT(address)']
  } catch(err) {
    throw err
  }
}

exports.getAllCollections = async () => {
  const q = "SELECT * FROM collections"
  try {
    const rows = await query(q)
    return rows
  } catch(err) {
    throw err
  }
}

// exports.getNFT = async (tokenIndex) => {
//   const q = "SELECT * FROM nfts WHERE tokenIndex like ?"
//   try {
//     const rows = await query(q, tokenIndex)
//     return rows[0]
//   } catch(err) {
//     throw err
//   }
// }
//
// exports.updateNFTValue = async (columnName, value, tokenIndex, jsonTrue) => {
//   const q = "UPDATE nfts SET " + columnName + " = ? WHERE tokenIndex = ?"
//   let _value = value
//   if(jsonTrue){
//     _value = JSON.stringify(value)
//   }
//   try {
//     await query(q, [_value, tokenIndex])
//     return "Ok"
//   } catch(err) {
//     throw err
//   }
// }
