const fs = require('fs')

fs.readFile('./day11.txt', 'utf-8', (err, data) => {
  let path = data.split(',')
  let x = 0
  let y = 0
  let z = 0
  let maxX = 0
  let maxY = 0
  let maxZ = 0

  path.forEach(step => {
    switch (step) {
      case 'n':
        y += 1
        z -= 1
        break
      case 's':
        y -= 1
        z += 1
        break
      case 'ne':
        x += 1
        z -= 1
        break
      case 'sw':
        x -= 1
        z += 1
        break
      case 'nw':
        x -=1
        y += 1
        break
      case 'se':
        x += 1
        y -= 1
        break
    }
    Math.abs(x) > maxX && (maxX = Math.abs(x))
    Math.abs(y) > maxY && (maxY = Math.abs(y))
    Math.abs(z) > maxZ && (maxZ = Math.abs(z))
  })

  let furthestPoint = Math.max(maxX, maxY, maxZ)
  console.log(furthestPoint)
})