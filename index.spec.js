/* eslint-env jest */
const fs = require('fs')
const processRovers = require('./index.js')

describe('index', () => {
  describe('default', () => {
    it('Should process an input string specifying a grid and set of Mars Rovers' +
      ' and produce an output string with their final positions on the grid' +
      ' after running their instruction sets sequentially', () => {
      const input = fs.readFileSync('sample_files/sample-input.txt', {encoding: 'utf8'})

      const output = processRovers(input)

      expect(output).toEqual('1 1 E\n3 3 N LOST\n2 3 S')
    })
  })
})
