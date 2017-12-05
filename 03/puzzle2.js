const puzzleInput = 312051
let spiral = {}

function startNewLayer(prevCell) {
  let x = prevCell.x + 1
  let y = prevCell.y
  spiral[`(${x}, ${y})`] = {
    'x': x,
    'y': y
  }
  return spiral[`(${x}, ${y})`]
}

function calculateCellValue(currentCell) {
  let sum = 0
  for (var i = (currentCell.x - 1); i < (currentCell.x + 2); i++) {
    for (var j = (currentCell.y - 1); j < (currentCell.y + 2); j++) {
      if (i === currentCell.x && j === currentCell.y) {}
      else {
        if (spiral.hasOwnProperty(`(${i}, ${j})`)) { 
          sum += spiral[`(${i}, ${j})`].value 
        }
      }
    }
  }
  return sum
}

function createNextCell(x, y) {
  spiral[`(${x}, ${y})`] = {
    'x': x,
    'y': y
  }
  let nextCell = spiral[`(${x}, ${y})`]
  nextCell.value = calculateCellValue(nextCell)
  return nextCell
}

function findNextLargestValue(input) {
  let x = 0
  let y = 0
  let value = 1
  let currentLayer = 0
  spiral[`(${x}, ${y})`] = {}
  spiral[`(${x}, ${y})`].x = x
  spiral[`(${x}, ${y})`].y = y 
  spiral[`(${x}, ${y})`].value = value
  
  x = 1
  y = 0
  value = 1
  currentLayer = 1
  spiral[`(${x}, ${y})`] = {}
  spiral[`(${x}, ${y})`].x = x
  spiral[`(${x}, ${y})`].y = y 
  spiral[`(${x}, ${y})`].value = value


  let currentCell = spiral[`(${x}, ${y})`]

  while (input > currentCell.value) {
    if (currentCell.x > 0 && currentCell.x === -currentCell.y) {
      currentCell = startNewLayer(currentCell)
      currentLayer += 1
      currentCell.value = calculateCellValue(currentCell)
    } else if (currentCell.x === currentLayer && currentCell.y < currentLayer) {
      currentCell = createNextCell(currentCell.x, (currentCell.y + 1))
    } else if (currentCell.y === currentLayer && currentCell.x > (-currentLayer)) {
      currentCell = createNextCell(currentCell.x - 1, currentCell.y)
    } else if (currentCell.x === -currentLayer && currentCell.y > (-currentLayer)) {
      currentCell = createNextCell(currentCell.x, currentCell.y - 1)
    } else if (currentCell.y === -currentLayer && currentCell.x < currentLayer) {
      currentCell = createNextCell(currentCell.x + 1, currentCell.y)
    }
  }
  console.log(currentCell.value)
}

findNextLargestValue(puzzleInput);