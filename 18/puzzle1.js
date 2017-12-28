const fs = require('fs')

fs.readFile('./day18.txt', 'utf-8', (err, data) => {
  let instructions = data.split('\n').map(instruction => {
    return {
      command: instruction.slice(0, instruction.indexOf(' ')),
      x: instruction[instruction.indexOf(' ') + 1],
      y: instruction.slice(instruction.indexOf(' ') + 3)
    }
  })

  let registers = {}
  let index = 0
  let lastSoundPlayed
  let recoverExecuted = false
  let recoveredSound

  while (!recoverExecuted) {
    handleInstruction(instructions[index])
  }

  console.log(recoveredSound)

  function handleInstruction(instruction) {
    if (!registers[instruction.x]) {
      registers[instruction.x] = 0
    }
    let x = isNaN(parseInt(instruction.x, 10)) ? instruction.x : parseInt(instruction.x, 10)
    let y = isNaN(parseInt(instruction.y, 10)) ? registers[instruction.y] : parseInt(instruction.y, 10)

    switch (instruction.command) {
      case 'snd':
        lastSoundPlayed = registers[x]
        index += 1
        break
      case 'set':
        registers[x] = y
        index += 1
        break
      case 'add':
        registers[x] += y
        index += 1
        break
      case 'mul':
        registers[x] = registers[x] * y
        index += 1
        break
      case 'mod':
        registers[x] = registers[x] % y
        index += 1
        break
      case 'rcv':
        if (registers[x] !== 0) {
          recoveredSound = lastSoundPlayed
          recoverExecuted = true
        }
        index += 1
        break
      case 'jgz':
        if ((registers[x] || x) > 0) {
          index += y
        } else {
          index += 1
        }
        break
    }
  }
})