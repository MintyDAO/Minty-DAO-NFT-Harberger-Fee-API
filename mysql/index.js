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

// COLLECTIONS
exports.insertNewCollection = async (
  address,
  name,
  symbol,
  initialPrice,
  uri,
  maxSupply,
  format,
  ipfsHash,
  isMintable
) => {
  const q = `INSERT IGNORE INTO collections (
    address,
    name,
    symbol,
    initialPrice,
    uri,
    maxSupply,
    format,
    ipfsHash,
    isMintable
  ) VALUES (?)`
  const values = [
    address,
    name,
    symbol,
    initialPrice,
    uri,
    maxSupply,
    format,
    ipfsHash,
    isMintable
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

exports.getCollection = async (address) => {
  const q = "SELECT * FROM collections WHERE address like ?"
  try {
    const rows = await query(q, address)
    return rows[0]
  } catch(err) {
    throw err
  }
}

// collection details
// details about minted nfts
exports.insertCollectionDetails = async (collection, nfts) => {
  const q = `INSERT IGNORE INTO collectionDetails (
    collection,
    nfts
  ) VALUES (?)`
  const values = [
    collection,
    JSON.stringify(nfts)
  ]
  try {
    await query(q, [values])
    return "Ok"
  } catch(err) {
    throw err
  }
}

exports.updateCollectionDetails = async (collection, nfts) => {
  const q = "UPDATE collectionDetails SET nfts = ? WHERE collection = ?"
  try {
    await query(q, [JSON.stringify(nfts), collection])
    return "Ok"
  } catch(err) {
    throw err
  }
}

exports.getCollectionsDetails = async () => {
  const q = "SELECT * FROM collectionDetails"
  try {
    const rows = await query(q)
    return rows
  } catch(err) {
    throw err
  }
}

exports.getCollectionDetails = async (collection) => {
  const q = "SELECT nfts FROM collectionDetails WHERE collection like ?"
  try {
    const rows = await query(q, collection)
    return rows
  } catch(err) {
    throw err
  }
}

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
