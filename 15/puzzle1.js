let generatorAPreviousValue = 116
let generatorBPreviousValue = 299

let generatorAMultiplier = 16807
let generatorBMultiplier = 48271
let divisor = 2147483647

let judgeCount = 0

for (let i = 1; i <= 40000000; i++) {
  createNextValues()
  if ((generatorAPreviousValue & 0xFFFF) === (generatorBPreviousValue & 0xFFFF)) {
    judgeCount += 1
  }
}

console.log(judgeCount)

function createNextValues() {
  generatorAPreviousValue = (generatorAPreviousValue * generatorAMultiplier) % divisor
  generatorBPreviousValue = (generatorBPreviousValue * generatorBMultiplier) % divisor
}