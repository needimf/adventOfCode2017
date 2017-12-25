const fs = require('fs')

fs.readFile('./day13.txt', 'utf-8', (err, data) => {
  let puzzleInput = data.split('\n')
  let securityGrid = new Array(95).fill(null)

  puzzleInput.forEach(layer => {
    securityGrid[parseInt(layer.slice(0, layer.indexOf(':')), 10)] = parseInt(layer.slice(layer.indexOf(' ')), 10)
  })
  
  let picoseconds = 0
  let layersCaught = []

  while (picoseconds < 95) {
    if (securityGrid[picoseconds]) {
      if (picoseconds % (((securityGrid[picoseconds] - 1)) * 2) === 0) {
        layersCaught.push(picoseconds)
      }
    }
    picoseconds += 1
  }

  let severity = layersCaught.reduce((sum, cur) => {
    return sum + (securityGrid[cur] * cur)
  }, 0)

  console.log(severity)
})