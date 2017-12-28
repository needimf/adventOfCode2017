const fs = require('fs')

fs.readFile('./day20.txt', 'utf-8', (err, data) => {
  let accelerations = []
  let particles = data.split('\n')
  particles = particles.map(particle => particle.split(', '))
  particles = particles.map(particle => {
    let accelX = parseInt(particle[2].slice(3, particle[2].indexOf(',')))
    let accelY = parseInt(particle[2].slice(particle[2].indexOf(',') + 1, particle[2].lastIndexOf(',')))
    let accelZ = parseInt(particle[2].slice(particle[2].lastIndexOf(',') + 1, particle[2].indexOf('>')))

    let accelMagnitude = Math.sqrt(Math.pow(accelX, 2) + Math.pow(accelY, 2) + Math.pow(accelZ, 2))
    accelerations.push(accelMagnitude)
    particle.push(accelMagnitude)

    let velX = parseInt(particle[1].slice(3, particle[1].indexOf(',')))
    let velY = parseInt(particle[1].slice(particle[1].indexOf(',') + 1, particle[1].lastIndexOf(',')))
    let velZ = parseInt(particle[1].slice(particle[1].lastIndexOf(',') + 1, particle[1].indexOf('>')))

    let velMagnitude = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2) + Math.pow(velZ, 2))
    particle.push(velMagnitude)
    return particle
  })

  let minimumAcceleration = Math.min(...accelerations)
  let nearestParticles = particles.filter((particle, index) => {
    if (particle[3] === minimumAcceleration) {
      particle.push(index)
      return true
    }
  })

  let closestParticleIndex = 0
  nearestParticles.forEach((particle, index) => {
    if (particle[4] < nearestParticles[closestParticleIndex][4]) closestParticleIndex = index
  })

  let nearestParticle = nearestParticles[closestParticleIndex][5]
  console.log(nearestParticle)
})