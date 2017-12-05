const fs = require('fs')

fs.readFile('./day5.txt', 'utf-8', (err, data) => {
  let puzzleInput = data.split('\n').map(number => parseInt(number, 10))
  let currentIdx = 0
  let finalIdx = puzzleInput.length - 1
  let jumps = 0

  while (currentIdx <= finalIdx) {
    let jumpDistance = puzzleInput[currentIdx]
    puzzleInput[currentIdx] += 1
    currentIdx += jumpDistance
    jumps += 1
  }
  console.log(jumps)
})
