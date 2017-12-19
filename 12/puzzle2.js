const fs = require('fs')

fs.readFile('./day12.txt', 'utf-8', (err, data) => {
  let puzzleInput = data.split('\n').map(input => input.slice(input.indexOf('>') + 2).split(', ').map(number => parseInt(number, 10)))
  let programsInGroups = []
  let numberOfGroups = 0

  function checkForConnectedPrograms(programs) {
    programs.forEach(program => {
      if (!programsInGroups.includes(program)) {
        programsInGroups.push(program)
        checkForConnectedPrograms(puzzleInput[program])
      }
    })
  }

  
  for (let i = 0; i < puzzleInput.length; i++) {
    if (!programsInGroups.includes(i)) {
      checkForConnectedPrograms([i])
      numberOfGroups += 1
    }
  }
  
  console.log(numberOfGroups)
})