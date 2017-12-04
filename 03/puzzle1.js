const puzzleInput = 312051


function determineLayerNumber(input) {
  let layerNumber = 0
  let incrementor = 0
  while ((input / 8) > (incrementor)) {
    layerNumber += 1
    incrementor += layerNumber
  }
  return layerNumber
}

function determineNumberOfDigitsOnASide(layerNum) {
  return ((layerNum * 2) + 1)
}

function determineLayerUpperAndLowerBounds(layerNum) {
  let layerNumber = layerNum
  let multiplier = 0
  while (layerNumber > 0) {
    multiplier += layerNumber
    layerNumber -= 1
  }
  let upperBound = (1 + (8 * multiplier))
  let lowerBound = upperBound - (8 * layerNum) + 1
  return [lowerBound, upperBound]
}



function determineManhattanDistance(input) {
  const layer = determineLayerNumber(input)
  const sideLength = determineNumberOfDigitsOnASide(layer)
  const bounds = determineLayerUpperAndLowerBounds(layer)
  const upperBound = bounds[1]
  const lowerBound = bounds[0]

  function determineInputSideLocation() {
    let difference = upperBound - input
    let side = Math.floor(difference / sideLength)
    return side;
  }

  const side = determineInputSideLocation()
  
  const distanceFromMiddleOfSide = Math.abs(((upperBound - (Math.floor(sideLength / 2)) - ((sideLength - 1) * side)) - input))
  
  const manhattanDistance = layer + distanceFromMiddleOfSide
  console.log(manhattanDistance)
}

determineManhattanDistance(puzzleInput)