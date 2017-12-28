const fs = require('fs')

fs.readFile('./day20.txt', 'utf-8', (err, data) => {
  let particles = data.split('\n').map(particle => particle.split(', '))
  particles = particles.map((particle, index) => {
    let particleObj = {
      posX: parseInt(particle[0].slice(3, particle[0].indexOf(','))),
      posY: parseInt(particle[0].slice(particle[0].indexOf(',') + 1, particle[0].lastIndexOf(','))),
      posZ: parseInt(particle[0].slice(particle[0].lastIndexOf(',') + 1, particle[0].indexOf('>'))),
      velX: parseInt(particle[1].slice(3, particle[1].indexOf(','))),
      velY: parseInt(particle[1].slice(particle[1].indexOf(',') + 1, particle[1].lastIndexOf(','))),
      velZ: parseInt(particle[1].slice(particle[1].lastIndexOf(',') + 1, particle[1].indexOf('>'))),
      accelX: parseInt(particle[2].slice(3, particle[2].indexOf(','))),
      accelY: parseInt(particle[2].slice(particle[2].indexOf(',') + 1, particle[2].lastIndexOf(','))),
      accelZ: parseInt(particle[2].slice(particle[2].lastIndexOf(',') + 1, particle[2].indexOf('>'))),
      particleNum: index
    }
    return particleObj
  })

  for (let i = 0; i < 1000; i++) {
    particles.forEach(particle => {
      moveParticleOneTick(particle)
    })
    let positions = []
    let collisionPositions = []

    particles.forEach(particle => {
      let position = `${particle.posX},${particle.posY},${particle.posZ}`
      if (positions.includes(position)) {
        if (!collisionPositions.includes(position)) {
          collisionPositions.push(position)
        }
      } else {
        positions.push(position)
      }
    })

    collisionPositions.forEach(collision => {
      let x = parseInt(collision.slice(0, collision.indexOf(',')))
      let y = parseInt(collision.slice(collision.indexOf(',') + 1, collision.lastIndexOf(',')))
      let z = parseInt(collision.slice(collision.lastIndexOf(',') + 1))
      particles = particles.filter(particle => {
        return !(particle.posX === x && particle.posY === y && particle.posZ === z)
      })
    })
  }

  console.log(particles.length)

  function moveParticleOneTick(particle) {
    particle.velX += particle.accelX
    particle.velY += particle.accelY
    particle.velZ += particle.accelZ
    particle.posX += particle.velX
    particle.posY += particle.velY
    particle.posZ += particle.velZ
  }
})