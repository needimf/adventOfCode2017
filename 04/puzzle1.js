const fs = require('fs')

fs.readFile('./day4.txt', 'utf-8', (err, data) => {
  let passphrases = data.split('\n')
  let passphraseWords = passphrases.map(passphrase => passphrase.split(' '))
  let validPassphrases = 0

  passphraseWords.forEach(passphrase => {
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