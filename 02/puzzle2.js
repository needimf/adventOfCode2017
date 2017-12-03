const fs = require('fs');
let checksum = 0

fs.readFile('./day2.txt', 'utf-8', (err, data) => {
  let spreadsheet = data.split('\n').map(row => row.split('	'))
  spreadsheet.forEach(row => {
    let num1 = parseInt(row[0])
    let num2 = parseInt(row[1])
    for (var i = 0; i < row.length; i++) {
      let numToDivide = parseInt(row[i])
      for (var j = 0; j < row.length; j++) {
        let numToDivideBy = parseInt(row[j])
        if (numToDivide === numToDivideBy) {}
        else if (numToDivide % numToDivideBy === 0) {
          num1 = numToDivide
          num2 = numToDivideBy
        }
      }
    }
    let quotient = num1 / num2
    checksum += quotient
  })
  console.log(checksum)
})