// TODO DRY Reafactoring

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



// Done

exports.insertNewIndex = async (
  tokenIndex,
  tokenIndexUsed,
  tokenReservedTime,
  owner,
  isOffered,
  offerPrice
) => {
  const q = `INSERT IGNORE INTO nfts (
    tokenIndex,
    tokenIndexUsed,
    tokenReservedTime,
    owner,
    isOffered,
    offerPrice) VALUES (?)`
  const values = [
    tokenIndex,
    tokenIndexUsed,
    tokenReservedTime,
    owner,
    isOffered,
    offerPrice
  ]
  try {
    await query(q, [values])
    return "Ok"
  } catch(err) {
    throw err
  }
}

exports.getAllNFTSInDB = async () => {
  const q = "SELECT * FROM nfts"
  try {
    const rows = await query(q)
    return rows
  } catch(err) {
    throw err
  }
}

exports.getNFT = async (tokenIndex) => {
  const q = "SELECT * FROM nfts WHERE tokenIndex like ?"
  try {
    const rows = await query(q, tokenIndex)
    return rows[0]
  } catch(err) {
    throw err
  }
}

exports.updateNFTValue = async (columnName, value, tokenIndex, jsonTrue) => {
  const q = "UPDATE nfts SET " + columnName + " = ? WHERE tokenIndex = ?"
  let _value = value
  if(jsonTrue){
    _value = JSON.stringify(value)
  }
  try {
    await query(q, [_value, tokenIndex])
    return "Ok"
  } catch(err) {
    throw err
  }
}
