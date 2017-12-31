#!/usr/bin/env node

const processRovers = require('./index.js')

const stdin = process.stdin
const stdout = process.stdout
const inputChunks = []

stdin.setEncoding('utf8')

stdin.on('data', function (chunk) {
  inputChunks.push(chunk)
})

stdin.on('end', function () {
  const input = inputChunks.join('')
  const output = processRovers(input)
  stdout.write(output)
  stdout.write('\n')
})
