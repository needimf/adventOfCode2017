const fs = require('fs')

fs.readFile('./day9.txt', 'utf-8', (err, puzzleInput) => {
  let total = 0
  let currentScore = 0
  let isGarbage = false
  let cancelNext = false

  for (var i = 0; i < puzzleInput.length; i++) {
    if (cancelNext) {
      cancelNext = false
    } else if (isGarbage) {
      if (puzzleInput[i] === '!') {
        cancelNext = true
      } else if (puzzleInput[i] === '>') {
        isGarbage = false
      }
    } else if (puzzleInput[i] === '!') {
      cancelNext = true
    } else if (puzzleInput[i] === '<') {
      isGarbage = true
    } else if (puzzleInput[i] === '{') {
      currentScore += 1
      total += currentScore
    } else if (puzzleInput[i] === '}') {
      currentScore -= 1
    } 
  }

  console.log(total)
})