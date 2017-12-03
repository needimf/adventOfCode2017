const fs = require('fs');
let checksum = 0

fs.readFile('./day2.txt', 'utf-8', (err, data) => {
  let spreadsheet = data.split('\n').map(row => row.split('	'))
  spreadsheet.forEach(row => {
    let min = parseInt(row[0])
    let max = parseInt(row[0])
    row.forEach(num => {
      let numInt = parseInt(num)
      if (numInt > max) {
        max = numInt
      } else if (numInt < min) {
        min = numInt
      }
    })
    let difference = max - min
    checksum += difference
  })
  console.log(checksum)
})