const fs = require('fs')

fs.readFile('./day10.txt', 'utf-8', (err, data) => {
  let inputLengths = data.split('');
  inputLengths = inputLengths.map(input => input.charCodeAt())
  let additionalLengths = [17, 31, 73, 47, 23]
  inputLengths.push(...additionalLengths)

  let list = new Array(256).fill(0)
  list = list.map((listItem, idx) => listItem = idx)

  let currentPosition = 0
  let skipSize = 0
  
  for (let i = 0; i < 64; i++) {
    inputLengths.forEach((length) => {
      if (length > 1) {
        if (currentPosition + length < list.length) {
          // Handle turn that doesn't wrap around
          let sublist = list.slice().splice(currentPosition, length)
          let reversedSublist = sublist.reverse()

          reversedSublist.forEach((listItem, idx) => {
            list[currentPosition + idx] = listItem
          })
        } else {
          // Handle wrap-around turn
          let sublist1 = list.slice().splice(currentPosition)
          let sublength = length - (list.length - currentPosition)
          let sublist2 = list.slice().splice(0, sublength)
          let splitPoint = sublist1.length
          let sublistTotal = sublist1.concat(sublist2)
          let reversedSublist = sublistTotal.reverse()

          reversedSublist.forEach((listItem, idx) => {
            list[(idx >= splitPoint ? idx - splitPoint : currentPosition + idx)] = listItem
          })
        }
      }
      currentPosition = (currentPosition + length + skipSize++) % 256
    })
  }

  let sparseHash = list.slice()
  let denseHash = new Array(16).fill(null).map(elem => elem = new Array(1).fill(null))
  sparseHash.forEach((number, index) => {
    denseHash[(Math.floor(index / 16))][0] === null ? denseHash[(Math.floor(index / 16))][0] = number : denseHash[(Math.floor(index / 16))].push(number)
  })

  denseHash = denseHash.map(section => section.reduce((acc, cur) => acc ^ cur))

  let hexadecimalHash = denseHash.map(number => number.toString(16).length === 1 ? `0${number.toString(16)}` : number.toString(16)).join('')
  console.log(hexadecimalHash)
})