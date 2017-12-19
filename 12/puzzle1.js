const fs = require('fs')

fs.readFile('./day12.txt', 'utf-8', (err, data) => {
  let puzzleInput = data.split('\n').map(input => input.slice(input.indexOf('>') + 2).split(', ').map(number => parseInt(number, 10)))
  let programsInGroupZero = []

  function checkForConnectedPrograms(programs) {
    programs.forEach(program => {
      if (!programsInGroupZero.includes(program)) {
        programsInGroupZero.push(program)
        checkForConnectedPrograms(puzzleInput[program])
      }
    })
  }

  checkForConnectedPrograms([0])
  console.log(programsInGroupZero.length)
})