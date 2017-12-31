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

module.exports = {
  buildRover,
  cardinal,
  turnLeft,
  turnRight
}
