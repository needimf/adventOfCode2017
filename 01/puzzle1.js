const fs = require('fs');
let sum = 0;

fs.readFile('./day1.txt', 'utf-8', (err, captcha) => {
  for (var i = 0; i < captcha.length; i++) {
    if (captcha[i] === captcha[i + 1]) {
      sum += parseInt(captcha[i], 10);
    }
  }

  if (captcha[captcha.length - 1] === captcha[0]) {
    sum += parseInt(captcha[0], 10);
  }

  console.log(sum);
});