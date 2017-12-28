const fs = require('fs')

fs.readFile('./day18.txt', 'utf-8', (err, data) => {
  let instructions = data.split('\n').map(instruction => {
    return {
      command: instruction.slice(0, instruction.indexOf(' ')),
      x: instruction[instruction.indexOf(' ') + 1],
      y: instruction.slice(instruction.indexOf(' ') + 3)
    }
  })

  let registers0 = {'p': 0}, 
      registers1 = {'p': 1}
  let [index0, index1] = [0, 0]
  let queue0 = [], queue1 = []
  let program1SendCount = 0
  let delay1 = false, delay0 = false
  let terminate0 = false, terminate1 = false

  while (!(delay1 && delay0) && !(terminate0 && terminate1) && !(terminate0 && delay1) && !(terminate1 && delay0)) {
    handleInstruction(instructions[index0], 0)
    handleInstruction(instructions[index1], 1)
  }
  
  console.log(program1SendCount)

  function handleInstruction(instruction, programNum) {
    if (programNum === 0 ? terminate0 : terminate1) {
      return
    }
    let registers, index, queue
    if (programNum === 0) {
      registers = registers0
      index = index0
      otherQueue = queue1
      queue = queue0
    } else {
      registers = registers1
      index = index1
      otherQueue = queue0
      queue = queue1
    }

    if (!registers[instruction.x]) {
      registers[instruction.x] = 0
    }
    let x = isNaN(parseInt(instruction.x, 10)) ? instruction.x : parseInt(instruction.x, 10)
    let y = isNaN(parseInt(instruction.y, 10)) ? registers[instruction.y] : parseInt(instruction.y, 10)

    switch (instruction.command) {
      case 'snd':
        typeof x === 'string' ? otherQueue.push(registers[x]) : otherQueue.push(x)
        index += 1
        if (programNum === 1) {program1SendCount += 1}
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
        if (queue.length) {
          programNum === 0 ? delay0 = false : delay1 = false
          registers[x] = queue.shift()
          index += 1
        } else {
          programNum === 0 ? delay0 = true : delay1 = true
        }
        break
      case 'jgz':
        if ((registers[x] || x) > 0) {
          index += y
        } else {
          index += 1
        }
        break
    }
    if (index > (instructions.length - 1) || index < 0) {
      programNum === 0 ? terminate0 = true : terminate1 = true
    }

    if (programNum) {
      index1 = index
    } else {
      index0 = index
    }
  }
})