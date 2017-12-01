const fs = require('fs')
let sum = 0

fs.readFile('./day1.txt', 'utf-8', (err, captcha) => {
  const halfwayDistance = (captcha.length / 2)
  const firstHalf = captcha.slice(0, halfwayDistance)
  const secondHalf = captcha.slice(halfwayDistance)
  for (var i = 0; i < halfwayDistance; i++) {
    if (firstHalf[i] === secondHalf[i]) {
      sum += (captcha[i] * 2)
    }
  }
  console.log(sum);
})