function buildRover (x, y, facing, instructions) {
  return {
    position: {x, y},
    facing,
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

function isOffGrid (position, grid) {
  return position.x < 0 ||
    position.y < 0 ||
    position.x > grid.length ||
    position.y > grid[0].length
}

module.exports = {
  buildRover,
  cardinal,
  turnLeft,
  turnRight,
  forward,
  buildGrid,
  isOffGrid
}
