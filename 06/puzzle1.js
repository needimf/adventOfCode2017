const fs = require('fs')

fs.readFile('./day6.txt', 'utf-8', (err, data) => {
  let puzzleInput = data.split('\t').map(data => parseInt(data, 10))
  let lastPuzzleIdx = puzzleInput.length - 1
  let states = []
  let currentState = puzzleInput.join()
  let count = 0


  while (!states.includes(currentState)) {
    states.push(puzzleInput.join())
    let largestBank = puzzleInput.indexOf(Math.max(...puzzleInput))
    let blocks = puzzleInput[largestBank]
    puzzleInput[largestBank] = 0
    let currentIdx = largestBank === lastPuzzleIdx ? 0 : largestBank + 1
    while (blocks > 0) {
      puzzleInput[currentIdx] += 1
      blocks -= 1
      currentIdx === lastPuzzleIdx ? currentIdx = 0 : currentIdx += 1
    }
    currentState = puzzleInput.join()
    count += 1
  }
  console.log(count)
})