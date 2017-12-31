/* eslint-env jest */
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
})
