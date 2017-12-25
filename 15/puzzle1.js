let generatorAPreviousValue = 116
let generatorBPreviousValue = 299

let generatorAMultiplier = 16807
let generatorBMultiplier = 48271
let divisor = 2147483647

let judgeCount = 0

for (let i = 1; i <= 40000000; i++) {
  let [valueA, valueB] = createNextValues()
  if ((valueA & 0xFFFF) === (valueB & 0xFFFF)) {
    judgeCount += 1
  }
}

console.log(judgeCount)

function createNextValues() {
  let valueA = (generatorAPreviousValue * generatorAMultiplier) % divisor
  let valueB = (generatorBPreviousValue * generatorBMultiplier) % divisor
  generatorAPreviousValue = valueA
  generatorBPreviousValue = valueB
  return [valueA, valueB]
}