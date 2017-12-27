const fs = require('fs')

fs.readFile('./day16.txt', 'utf-8', (err, data) => {
  let danceInstructions = data.split(',')
  let start = 'abcdefghijklmnop'.split('')
  let programs = 'abcdefghijklmnop'.split('')
  let program1, program2, position1, position2
  let permutationLength = 0

  function runADance() {
    danceInstructions.forEach(instruction => {
      switch (instruction[0]) {
        case 's':
          let spinSize = parseInt(instruction.slice(1))
          let programsToMove = programs.splice(programs.length - spinSize)
          programs = programsToMove.concat(programs)
          break
        case 'x':
          position1 = parseInt(instruction.slice(1, instruction.indexOf('/')))
          position2 = parseInt(instruction.slice(instruction.indexOf('/') + 1))
          program1 = programs[position1]

          programs[position1] = programs[position2]
          programs[position2] = program1
          break
        case 'p':
          program1 = instruction.slice(1, instruction.indexOf('/'))
          program2 = instruction.slice(instruction.indexOf('/') + 1)
          position1 = programs.indexOf(program1)
          position2 = programs.indexOf(program2)

          programs[position1] = program2
          programs[position2] = program1
          break
      }
    })
  }

  do {
    runADance()
    permutationLength += 1
  } while (start.join('') !== programs.join(''))

  for (let i = 0; i < (1000000000 % permutationLength); i++) {
    runADance()
  }

  console.log(programs.join(''))
})