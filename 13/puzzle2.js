const fs = require('fs')

fs.readFile('./day13.txt', 'utf-8', (err, data) => {
  let puzzleInput = data.split('\n')
  let securityGrid = new Array(95).fill(null)

  puzzleInput.forEach(layer => {
    securityGrid[parseInt(layer.slice(0, layer.indexOf(':')), 10)] = parseInt(layer.slice(layer.indexOf(' ')), 10)
  })
  
  let picoseconds = 0
  let layersCaught = []
  let clearedSafely = false
  let delayTime = 0

  function determineIfPackageGetsCaught(startTime) {
    let time = startTime
    while (time < (securityGrid.length + startTime)) {
      if (securityGrid[time - startTime]) {
        if (time % (((securityGrid[time - startTime] - 1)) * 2) === 0) {
          layersCaught.push(time)
        }
      }
      time += 1
    }
  }

  while (!clearedSafely) {
    determineIfPackageGetsCaught(picoseconds)
    if (layersCaught.length === 0) {
      clearedSafely = true
      delayTime = picoseconds
    }
    layersCaught = []
    picoseconds += 1
  }

  console.log(delayTime)

})