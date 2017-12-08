const fs = require('fs');

fs.readFile('./day7.txt', 'utf-8', (err, data) => {
  let puzzleInputPrograms = data.split('\n')
  let towerTops = puzzleInputPrograms.filter(program => !program.includes('->'))
  let programsWithDiscs = puzzleInputPrograms.filter(program => program.includes('->'))

  let bottomProgram = false;
  let bottomProgramName;
  let index = 0
  
  while (bottomProgram === false && index < programsWithDiscs.length) {
    let programName = programsWithDiscs[index].slice(0, programsWithDiscs[index].indexOf(' '))
    bottomProgram = programsWithDiscs.every((otherProgram, idx) => {
      if (index === idx) {
        return true
      } else if (!otherProgram.includes(programName)) {
        return true
      }
    })
    if (bottomProgram) bottomProgramName = programName
    index++
  }
  
  return bottomProgramName
})