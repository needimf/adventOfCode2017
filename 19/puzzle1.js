const fs = require('fs')

fs.readFile('./day19.txt', 'utf-8', (err, data) => {
  let routingDiagram = data.split('\n').map(row => row.split(''))

  let lettersEncountered = []
  let currentPosition = [0, routingDiagram[0].indexOf('|'), 'down']
  let finished = false

  while (!finished) {
    currentPosition = oneStep(currentPosition[0], currentPosition[1], currentPosition[2])
  }

  console.log(lettersEncountered.join(''))

  function oneStep(row, col, direction) {
    switch (direction) {
      case 'down':
      row += 1
      break
      case 'up':
      row -= 1
      break
      case 'right':
      col += 1
      break
      case 'left':
      col -= 1
      break
    }

    if (/^[a-zA-Z]$/.test(routingDiagram[row][col])) {
      lettersEncountered.push(routingDiagram[row][col])
    } else {
      switch (routingDiagram[row][col]) {
        case '+':
          direction = determineNewDirection(direction, row, col)
          break
        case ' ':
          finished = true
          break
      }
    }
    return [row, col, direction]
  }

  function determineNewDirection(previousDirection, row, col) {
    let possibleDirections = []
    if (routingDiagram[row - 1][col] !== ' ') {
      possibleDirections.push('up')
    }
    if (routingDiagram[row + 1][col] !== ' ') {
      possibleDirections.push('down')
    }
    if (routingDiagram[row][col - 1] !== ' ') {
      possibleDirections.push('left')
    }
    if (routingDiagram[row][col + 1] !== ' ') {
      possibleDirections.push('right')
    }
    switch (previousDirection) {
      case 'up':
        previousDirection = 'down'
        break
      case 'down':
        previousDirection = 'up'
        break
      case 'left':
        previousDirection = 'right'
        break
      case 'right':
        previousDirection = 'left'
        break
    }

    possibleDirections.splice(possibleDirections.indexOf(previousDirection), 1)
    return possibleDirections.join('')
  }
})