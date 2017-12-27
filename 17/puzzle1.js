let stepNumber = 328
let currentPosition = 0
let state = [0]

for (let value = 1; value < 2018; value++) {
  currentPosition = ((stepNumber + currentPosition) % state.length) + 1
  state.splice(currentPosition, 0, value)
}

let locationOfTarget = state.indexOf(2017)
console.log(state[(locationOfTarget + 1 === state.length ? 0 : locationOfTarget + 1)])