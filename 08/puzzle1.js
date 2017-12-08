const fs = require('fs');

fs.readFile('./day8.txt', 'utf-8', (err, data) => {
  let instructions = data.split('\n')
  let registers = {}
  instructions.forEach(instruction => {
    registers[instruction.slice(0, instruction.indexOf(' '))] = 0
  })

  instructions.forEach(instruction => {
    let firstSpace = instruction.indexOf(' ')
    let register = instruction.slice(0, firstSpace)
    let operation = instruction.slice(firstSpace + 1, firstSpace + 4)
    let amount = parseInt(instruction.slice(firstSpace + 5, instruction.indexOf('if') - 1), 10)
    let condition = instruction.slice(instruction.indexOf('if') + 3)
    let conditionTarget = condition.slice(0, condition.indexOf(' '))
    condition = condition.replace(conditionTarget, `registers.${conditionTarget}`)
    if (eval(condition)) {
      operation === 'inc' ? registers[register] += amount : registers[register] -= amount
    }
  })


  function findMaxRegisterValue(regs) {
    let max = 0
    for (var key in regs) {
      if (regs[key] > max) {max = regs[key]}
    }
    return max
  }
  console.log(findMaxRegisterValue(registers))
})