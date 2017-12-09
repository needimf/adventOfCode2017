const fs = require('fs');

fs.readFile('./day9.txt', 'utf-8', (err, puzzleInput) => {
  let count = 0
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
      } else {
        count += 1
      }
    } else if (puzzleInput[i] === '!') {
      cancelNext = true
    } else if (puzzleInput[i] === '<') {
      isGarbage = true
    }
  }

  console.log(count)
})