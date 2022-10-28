// 0 Add 1 Remove

const manageCollectionDetails = require('./helpers/manageCollectionDetails')

async function manageUnprotected(){
    manageCollectionDetails("22x", 1, 1777, "hash", ".png")
    manageCollectionDetails("11x", 1, 2777, "hash2", ".png")
    manageCollectionDetails("33x", 1, 3777, "hash3", ".png")
    return
}


manageUnprotected()
