/* eslint-env jest */
const fs = require('fs')
const mr = require('./mars-rover.js')

describe('mars-rover', () => {
  describe('turnLeft', () => {
    it('should change the facing to West when the initial facing was North', () => {
      const rover = mr.buildRover(0, 0, 0)

      const updatedRover = mr.turnLeft(rover)

      expect(mr.cardinal(rover.facing)).toEqual('N')
      expect(mr.cardinal(updatedRover.facing)).toEqual('W')
    })
  })

  describe('turnRight', () => {
    it('should change the facing to North when the initial facing was West', () => {
      const rover = mr.buildRover(0, 0, 3)

      const updatedRover = mr.turnRight(rover)

      expect(mr.cardinal(rover.facing)).toEqual('W')
      expect(mr.cardinal(updatedRover.facing)).toEqual('N')
    })
  })

  describe('forward', () => {
    it('Should move one step in the direction of facing', () => {
      let rover = mr.buildRover(0, 0, 0)

      let updatedRover = mr.forward(rover)

      expect(rover.position).toEqual({x: 0, y: 0})
      expect(updatedRover.position).toEqual({x: 0, y: 1})
    })
  })

  describe('isOffGrid', () => {
    it('Should return true if position is not within the grid', () => {
      let grid = mr.buildGrid(3, 2)

      expect(mr.isOffGrid(grid, {x: 0, y: 0})).toBe(false)
      expect(mr.isOffGrid(grid, {x: 4, y: 0})).toBe(true)
      expect(mr.isOffGrid(grid, {x: 3, y: 3})).toBe(true)
      expect(mr.isOffGrid(grid, {x: -1, y: 0})).toBe(true)
      expect(mr.isOffGrid(grid, {x: 0, y: -2})).toBe(true)
    })
  })

  describe('dropScent', () => {
    it('Should mark a position on the grid as scented', () => {
      let grid = mr.buildGrid(3, 2)

      mr.dropScent(grid, {x: 0, y: 1})

      expect(mr.hasScent(grid, {x: 0, y: 1})).toBe(true)
      expect(mr.hasScent(grid, {x: 0, y: 0})).toBe(false)
    })
  })

  describe('processInstructions', () => {
    it('Should process the rover instructions and move it around the grid, using first example given', () => {
      let rover = mr.buildRover(1, 1, 1, 'RFRFRFRF')
      let grid = mr.buildGrid(5, 3)

      rover = mr.processInstructions(rover, grid)

      expect(rover).toEqual({
        position: {x: 1, y: 1},
        previousPosition: {x: 0, y: 1},
        facing: 1,
        lost: false,
        instructions: 'RFRFRFRF'
      })
    })

    it('Should process the rover instructions and move it around the grid, using second example given', () => {
      let rover = mr.buildRover(3, 2, 0, 'FRRFLLFFRRFLL')
      let grid = mr.buildGrid(5, 3)

      rover = mr.processInstructions(rover, grid)

      expect(rover).toEqual({
        position: {x: 3, y: 4},
        previousPosition: {x: 3, y: 3},
        facing: 0,
        lost: true,
        instructions: 'FRRFLLFFRRFLL'
      })
    })

    it('Should process the rover instructions and move it around the grid, using third example given', () => {
      let rover = mr.buildRover(0, 3, 3, 'LLFFFLFLFL')
      let grid = mr.buildGrid(5, 3)

      mr.dropScent(grid, {x: 3, y: 3})

      rover = mr.processInstructions(rover, grid)

      expect(rover).toEqual({
        position: {x: 2, y: 3},
        previousPosition: {x: 3, y: 3},
        facing: 2,
        lost: false,
        instructions: 'LLFFFLFLFL'
      })
    })
  })

  describe('parseInput', () => {
    it('Should parse the input file and create the problem specification', () => {
      const input = fs.readFileSync('sample_files/sample-input.txt', {encoding: 'utf8'})
      const spec = mr.parseInput(input)

      expect(spec.grid.length).toEqual(5)
      expect(spec.grid[0].length).toEqual(3)

      expect(spec.rovers).toEqual([{
        instructions: 'RFRFRFRF',
        facing: 1,
        lost: false,
        position: {x: 1, y: 1},
        previousPosition: {x: 1, y: 1}
      }, {
        instructions: 'FRRFLLFFRRFLL',
        facing: 0,
        lost: false,
        position: {x: 3, y: 2},
        previousPosition: {x: 3, y: 2}
      }, {
        instructions: 'LLFFFLFLFL',
        facing: 3,
        lost: false,
        position: {x: 0, y: 3},
        previousPosition: {x: 0, y: 3}
      }]
      )
    })

    it('Should throw a RangeError if a co-ordinate value is over 50', () => {
      expect(() => mr.parseInput('51 3\n1 1 E\n')).toThrowError('coordinate vale of 51, the maximum value is 50')
      expect(() => mr.parseInput('5 3\n1 52 E\n')).toThrowError('coordinate vale of 52, the maximum value is 50')
    })

    it('Should throw a RangeError if input instructions are over 100 characters long', () => {
      const input = '5 3\n1 1 E\n' + new Array(102).join('L') + '\n'

      expect(() => mr.parseInput(input))
      .toThrowError('instructions are 101 characters in length, the maximum value is 100')
    })
  })
})
