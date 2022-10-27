// 0 Add 1 Remove

const manageCollectionDetails = require('./helpers/manageCollectionDetails')

async function manageUnprotected(){
    manageCollectionDetails("0x", 1, 1777, "0x", 1, 1777)
    manageCollectionDetails("1x", 1, 2777)
    manageCollectionDetails("2x", 1, 3777)
    return
}


manageUnprotected()
