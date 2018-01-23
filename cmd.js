#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')
const packageJson = require('./package.json')
const { Commit, Clone, Status } = require('./src/commands')

let cmdValue
let envValue
const CMD_NAME = 'modular-tools'
const pwd = shell.pwd().stdout

program
  .version(packageJson.version)
  .arguments('<command> [name]')
  .action((command, name) => {
    cmdValue = command
    envValue = name
  })

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('')
  console.log('  Commands:')
  console.log('')
  console.log(`    ${CMD_NAME} clone`)
  console.log(`    ${CMD_NAME} commit`)
  console.log(`    ${CMD_NAME} config`)
  console.log('')
})

program.parse(process.argv)

switch(cmdValue) {
  case 'clone':
    Clone(pwd, cmdValue, envValue)
    break
  case 'commit':
    Commit(pwd, cmdValue, envValue)
    break
  case 'config':
    Status(pwd, cmdValue, envValue)
    break
  default:
    console.log('')
    console.log('  command:', cmdValue, 'is not found.')
    program.help()
}



