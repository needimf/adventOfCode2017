const fs = require('fs');

fs.readFile('./day10.txt', 'utf-8', (err, data) => {
  let inputLengths = data.split(',').map(number => parseInt(number, 10))

  let list = new Array(256).fill(0)
  list = list.map((listItem, idx) => listItem = idx)

  let currentPosition = 0
  let skipSize = 0
  inputLengths.forEach((length) => {
    if (!(length > list.length)) {
        if (currentPosition + length < list.length) {
        // Handle turn that doesn't wrap around
        let sublist = list.slice().splice(currentPosition,length)
        let reversedSublist = sublist.reverse()

        reversedSublist.forEach((listItem, idx) => {
          list[currentPosition + idx] = listItem
        })
        currentPosition + length + skipSize > list.length ? currentPosition = (currentPosition + length + skipSize) - list.length : currentPosition += (length + skipSize) 
        skipSize += 1
      } else {
        // Handle wrap-around turn
        let sublist1 = list.slice().splice(currentPosition)
        length = length - (list.length - currentPosition)
        let sublist2 = list.slice().splice(0, length)
        let splitPoint = sublist1.length
        let sublistTotal = sublist1.concat(sublist2)
        let reversedSublist = sublistTotal.reverse()

        reversedSublist.forEach((listItem, idx) => {
          list[(idx >= splitPoint ? idx - splitPoint : currentPosition + idx)] = listItem
        })
        currentPosition = (length + skipSize)
        skipSize += 1
      }
    }
  })
  console.log(list[0] * list[1])
})