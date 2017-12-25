let generatorAPreviousValue = 116
let generatorBPreviousValue = 299

let generatorAMultiplier = 16807
let generatorBMultiplier = 48271
let divisor = 2147483647

let judgeCount = 0

for (let i = 1; i <= 5000000; i++) {
  createNextValues()
  if ((generatorAPreviousValue & 0xFFFF) === (generatorBPreviousValue & 0xFFFF)) {
    judgeCount += 1
  }
}

console.log(judgeCount)

function createNextValues() {
  do { generatorAPreviousValue = (generatorAPreviousValue * generatorAMultiplier) % divisor } while (generatorAPreviousValue % 4 != 0)
  do { generatorBPreviousValue = (generatorBPreviousValue * generatorBMultiplier) % divisor } while (generatorBPreviousValue % 8 != 0)
}