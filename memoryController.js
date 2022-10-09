const v8 = require('v8')

module.exports = () => {
setInterval(checkMemmory,10000)
}

const checkMemmory = () => {
  const stat = v8.getHeapStatistics()
  const totalAvailableSize = Math.round(stat.total_available_size / 1024 / 1024)

  console.log("total_available_size:", totalAvailableSize, "MB")
  if(totalAvailableSize < 300)
  // pm2 reload automaticly
  process.exit(1)
}
