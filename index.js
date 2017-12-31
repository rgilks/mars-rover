const mr = require('./mars-rover.js')

module.exports = function (input) {
  const spec = mr.parseInput(input)
  const rovers = mr.processSequentially(spec)
  return mr.buildOutput(rovers)
}
