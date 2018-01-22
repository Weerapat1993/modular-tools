#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')
const packageJson = require('./package.json')
const { Config, ConfigAdd, ConfigRemove, Clone, Status } = require('./src/commands')

let cmdValue
let envValue
const CMD_NAME = 'modular'
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
  console.log(`    ${CMD_NAME} status`)
  console.log(`    ${CMD_NAME} config`)
  // console.log(`    ${CMD_NAME} config:add [name]`)
  // console.log(`    ${CMD_NAME} config:remove [name]`)
  console.log('')
})

program.parse(process.argv)

switch(cmdValue) {
  case 'clone':
    Clone(pwd, cmdValue, envValue)
    break
  case 'status':
    Status(pwd, cmdValue, envValue)
    break
  case 'config':
    Config(pwd, cmdValue, envValue)
    break
  // case 'config:add':
  //   if(envValue) {
  //     ConfigAdd(pwd, cmdValue, envValue)
  //   } else {
  //     program.help()
  //   }
  //   break
  // case 'config:remove':
  //   if(envValue) {
  //     ConfigRemove(pwd, cmdValue, envValue)
  //   } else {
  //     program.help()
  //   }
  //   break
  default:
    console.log('')
    console.log('  command:', cmdValue, 'is not found.')
    program.help()
}



