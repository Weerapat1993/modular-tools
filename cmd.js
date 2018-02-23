#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');
const packageJson = require('./package.json');
const {
  Commit,
  Clone,
  Status,
  Init,
  MakeFeature,
  MakeCommon,
  MakeComponent,
  MakeUtil,
} = require('./app/commands');
const { checkName } = require('./app/utils');

let cmdValue;
let envValue;
const CMD_NAME = 'modular';
const pwd = shell.pwd().stdout;

program
  .version(packageJson.version)
  .arguments('<command> [name]')
  .action((command, name) => {
    cmdValue = command;
    envValue = name;
  });

// must be before .parse() since
// node's emit() is immediate

program.on('--help', () => {
  console.log('');
  console.log('  Commands:');
  console.log('');
  console.log(`    ${CMD_NAME} init`);
  console.log(`    ${CMD_NAME} config`);
  console.log(`    ${CMD_NAME} commit`);
  console.log(`    ${CMD_NAME} clone`);
  console.log(`    ${CMD_NAME} make:common`);
  console.log(`    ${CMD_NAME} make:component`);
  console.log(`    ${CMD_NAME} make:feature`);
  console.log(`    ${CMD_NAME} make:util`);
  console.log('');
});

program.parse(process.argv);

switch (cmdValue) {
  case 'init':
    Init(pwd, cmdValue, envValue);
    break;
  case 'clone':
    Clone(pwd, cmdValue, envValue);
    break;
  case 'commit':
    Commit(pwd, cmdValue, envValue);
    break;
  case 'config':
    Status(pwd, cmdValue, envValue);
    break;
  case 'make:common':
    checkName(envValue, () => {
      MakeCommon(pwd, cmdValue, envValue);
    });
    break;
  case 'make:component':
    checkName(envValue, () => {
      MakeComponent(pwd, cmdValue, envValue);
    });
    break;
  case 'make:feature':
    checkName(envValue, () => {
      MakeFeature(pwd, cmdValue, envValue);
    });
    break;
  case 'make:util':
    if (envValue) {
      MakeUtil(pwd, cmdValue, envValue);
    } else {
      console.log('Error');
    }
    break;
  default:
    console.log('');
    console.log('  command:', cmdValue, 'is not found.');
    program.help();
}

