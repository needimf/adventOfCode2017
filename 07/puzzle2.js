const fs = require('fs');

fs.readFile('./day7.txt', 'utf-8', (err, data) => {
  let puzzleInputPrograms = data.split('\n')
  let towerTops = puzzleInputPrograms.filter(program => !program.includes('->'))
  let programsWithDiscs = puzzleInputPrograms.filter(program => program.includes('->'))
  
  let bottomProgram = false;
  let bottomProgramName;
  let index = 0
  
  while (bottomProgram === false && index < programsWithDiscs.length) {
    let programName = programsWithDiscs[index].slice(0, programsWithDiscs[index].indexOf(' '))
    bottomProgram = programsWithDiscs.every((otherProgram, idx) => {
      if (index === idx) {
        return true
      } else if (!otherProgram.includes(programName)) {
        return true
      }
    })
    if (bottomProgram) bottomProgramName = programName
    index++
  }

  function findTowerWeight(programName) {
    let towerWeight = 0
    let currentProgram = puzzleInputPrograms.find(program => program.slice(0, program.indexOf(' ')) === programName)
    let currentProgramWeight = parseInt(currentProgram.slice(currentProgram.indexOf('(') + 1, currentProgram.indexOf(')')), 10)
    let childPrograms;
    if (currentProgram.includes('->')) {
      childPrograms = currentProgram.slice(currentProgram.indexOf('>') + 2).split(', ')
    }
    let childProgramWeights = []

    if (!childPrograms) {
      return currentProgramWeight
    } else {
      childPrograms.forEach(child => {
        childProgramWeights.push(findTowerWeight(child))
      })
      return currentProgramWeight + childProgramWeights.reduce((acc, current) => acc + current)
    }

  }

  function findOffBalanceTower(programName, programWeight, targetWeight) {
    let currentProgram = puzzleInputPrograms.find(program => program.slice(0, program.indexOf(' ')) === programName)
    let childPrograms = currentProgram.slice(currentProgram.indexOf('>') + 2).split(', ')   
    let childProgramWeights = [];

    childPrograms.forEach(program => {
      childProgramWeights.push(findTowerWeight(program))
    })

    let areBalanced = childProgramWeights.every(weight => weight === childProgramWeights[0])
    if (!areBalanced) {
      let unbalancedWeight = childProgramWeights.filter((weight, idx) => {
        let weightsCopy = childProgramWeights.slice()
        weightsCopy.splice(weightsCopy.indexOf(weight), 1)
        return !weightsCopy.includes(weight)
      })
      let unbalancedTower = childPrograms[childProgramWeights.indexOf(...unbalancedWeight)]
      return findOffBalanceTower(unbalancedTower, unbalancedWeight, childProgramWeights.find(weight => weight !== unbalancedWeight[0]))
    } else {
      return [currentProgram, targetWeight, childProgramWeights[0]]
    }
  }

  function calculateCorrectWeight(programName) {
    let offBalanceTowerData = findOffBalanceTower(bottomProgramName)
    let childPrograms = offBalanceTowerData[0].slice(offBalanceTowerData[0].indexOf('>') + 2).split(', ')

    console.log(offBalanceTowerData[1] - (offBalanceTowerData[2] * childPrograms.length))
  }

  calculateCorrectWeight(bottomProgramName)
})