const fs = require('fs')

fs.readFile('./day4.txt', 'utf-8', (err, data) => {
  let passphrases = data.split('\n').map(passphrase => passphrase.split(' '))
  passphrases.forEach((passphrase, idx) => {
    passphrases[idx] = passphrase.map(word => word.split('').sort().join(''))
  })
  let validPassphrases = 0

  passphrases.forEach(passphrase => {
    let duplicates = 0
    passphrase.forEach((word, idx) => {
      let passphraseCopy = passphrase.slice()
      passphraseCopy.splice(idx, 1)
      if (passphraseCopy.includes(word)) duplicates += 1
    })
    if (duplicates === 0) validPassphrases += 1
  })

  console.log(validPassphrases)
})