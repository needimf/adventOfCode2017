let stepNumber = 328
let currentPosition = 0
let stateLength = 1
let valueAtOne

for (let value = 1; value <= 50000000; value++) {
  currentPosition = ((stepNumber + currentPosition) % stateLength) + 1
  if (currentPosition === 1) {valueAtOne = value}
  stateLength += 1
}

console.log(valueAtOne)