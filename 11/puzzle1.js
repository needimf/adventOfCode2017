const fs = require('fs')

fs.readFile('./day11.txt', 'utf-8', (err, data) => {
  let path = data.split(',')
  let x = 0
  let y = 0
  let z = 0

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
  })

  let shortestDistance = Math.max(Math.abs(x), Math.abs(y), Math.abs(z))
  console.log(shortestDistance)
})