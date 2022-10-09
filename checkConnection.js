const isOnline = require('is-online')
module.exports = () => {
setInterval(check,30000)
}

check = () => {
  isOnline().then(online => {
      if(online){
          console.log("Status: connected")
      }else{
          console.log("Status: disconnected")
      }
  })
}
