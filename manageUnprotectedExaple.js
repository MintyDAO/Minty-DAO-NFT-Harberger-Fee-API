// 0 Add 1 Remove

const addUnprotected = require('./helpers/addUnprotected')
const removeUnprotected = require('./helpers/removeUnprotected')

function manageUnprotected(){
    // create data 
    let collection = [
    {
      "0x":[
        {
          id:0,
          protectionTime:1
        }
      ]

    },
    {
      "1x":[
        {
          id:0,
          protectionTime:2
        }
      ]

     },
     {
       "2x":[
         {
           id:0,
           protectionTime:3
         },
         {
           id:1,
           protectionTime:4
         }
       ]

      }
    ]

    console.log(collection)

    // update existed
    collection = addUnprotected("0x", 1, 2,collection)
    collection = addUnprotected("0x", 1, 3,collection)

    // create new
    collection = addUnprotected("5x", 1, 2,collection)

    console.log(collection)

    // remove existed
    collection = removeUnprotected("5x", 1,collection)

    console.log(collection)

    // remove not existed
    collection = removeUnprotected("5x", 1,collection)
    collection = removeUnprotected("5x", 1,collection)
    collection = removeUnprotected("5x", 1,collection)

    console.log(collection)
}

manageUnprotected()
