function buildRover (x, y, facing, instructions) {
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

function processInstructions (rover, grid) {
  let r = {
    ...rover,
    position: {...rover.position},
    previousPosition: {...rover.previousPosition}
  }

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
  processInstructions
}
