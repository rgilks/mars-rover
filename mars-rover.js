const maxCoordinateValue = 50
const maxInstructionsLength = 100

function buildRover (x, y, facing, instructions) {
  if (instructions && instructions.length > maxInstructionsLength) {
    throw new RangeError(
      `instructions are ${instructions.length} characters in length, the maximum value is ${maxInstructionsLength}`)
  }

  return {
    position: {x, y},
    previousPosition: {x, y},
    facing,
    lost: false,
    instructions
  }
}

const orientation = [
  {cardinal: 'N', step: p => p.y++},
  {cardinal: 'E', step: p => p.x++},
  {cardinal: 'S', step: p => p.y--},
  {cardinal: 'W', step: p => p.x--}]

function cardinal (facing) {
  return orientation[facing].cardinal
}

function turn (inc, rover) {
  let facing = rover.facing + inc

  if (facing < 0) {
    facing = orientation.length - 1
  } else if (facing > orientation.length - 1) {
    facing = 0
  }

  return {...rover, facing}
}

const turnLeft = rover => turn(-1, rover)
const turnRight = rover => turn(1, rover)

function forward (rover) {
  let position = {...rover.position}
  let previousPosition = {...rover.position}

  orientation[rover.facing].step(position)

  return {...rover, position, previousPosition}
}

function buildGrid (x, y) {
  const grid = new Array(x)

  for (let i = 0; i < x; i++) {
    grid[i] = new Array(y)
  }

  return grid
}

function isOffGrid (grid, position) {
  return position.x < 0 ||
    position.y < 0 ||
    position.x > grid.length ||
    position.y > grid[0].length
}

function hasScent (grid, position) {
  return grid[position.x][position.y] === true
}

function dropScent (grid, position) {
  grid[position.x][position.y] = true
}

let command = {
  L: turnLeft,
  R: turnRight,
  F: forward
}

function processInstructions (rover, grid, additionalCommands) {
  let r = {
    ...rover,
    position: {...rover.position},
    previousPosition: {...rover.previousPosition}
  }

  command = {...command, ...additionalCommands}

  let instructions = r.instructions.split('')

  instructions.forEach(i => {
    if (!r.lost) {
      r = command[i](r)
      if (isOffGrid(grid, r.position)) {
        if (hasScent(grid, r.previousPosition)) {
          r.position = {...r.previousPosition}
        } else {
          r.lost = true
          dropScent(grid, r.previousPosition)
        }
      }
    }
  })

  return r
}

function parseCoordinate (s) {
  const i = parseInt(s)
  if (i > maxCoordinateValue) {
    throw new RangeError(`coordinate vale of ${s}, the maximum value is ${maxCoordinateValue}`)
  }
  return i
}

function parseInput (input) {
  const line = input.split('\n')
  const gridSpec = line[0].split(' ')
  const grid = buildGrid(parseCoordinate(gridSpec[0]), parseCoordinate(gridSpec[1]))

  const rovers = []

  let i = 1

  while (i < line.length - 1) {
    while (line[i] === '') {
      i++
    }
    const roverSpec = line[i].split(' ')
    const orient = orientation.findIndex(o => o.cardinal === roverSpec[2])
    const rover = buildRover(parseCoordinate(roverSpec[0]), parseCoordinate(roverSpec[1]), orient, line[i + 1])
    rovers.push(rover)
    i += 2
  }

  return {grid, rovers}
}

function processSequentially (spec, additionalCommands) {
  return spec.rovers.map(rover => processInstructions(rover, spec.grid, additionalCommands))
}

function buildOutput (rovers) {
  return rovers.map(rover =>
    rover.lost
      ? `${rover.previousPosition.x} ${rover.previousPosition.y} ${orientation[rover.facing].cardinal} LOST`
      : `${rover.position.x} ${rover.position.y} ${orientation[rover.facing].cardinal}`)
  .reduce((a, b) => `${a}\n${b}`)
}

module.exports = {
  buildRover,
  cardinal,
  turnLeft,
  turnRight,
  forward,
  buildGrid,
  isOffGrid,
  hasScent,
  dropScent,
  processInstructions,
  parseInput,
  processSequentially,
  buildOutput
}
