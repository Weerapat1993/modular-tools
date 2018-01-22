const fs = require('fs-extra')
const chalk = require('chalk')
const { path, createTable } = require('../utils')
const modularConfig = require('../../modular.config.json')

/**
 * Modular Clone Config Add
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const ConfigAdd = async (pwd, cmd, env) => {
  const modulars = modularConfig.childModular
  const checkModular = modulars.filter(item => item.project_name === env).length
  if(checkModular) {
    console.log(chalk.red(`Error: project name ${env} is exists.`))
  } else {
    modulars.push({
      project_name: env,
      path: pwd
    })
    CreateModularTable(modulars)
  }
}

/**
 * Modular Clone Config Remove
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const ConfigRemove = async (pwd, cmd, env) => {
  const modulars = modularConfig.childModular
  const checkModular = modulars.filter(item => item.project_name === env).length
  if(!checkModular) {
    console.log(chalk.red(`Error: project name ${env} is not exists.`))
  } else {
    const removed = modulars.filter(item => item.project_name !== env)
    CreateModularTable(removed)
  }
}

/**
 * Create Modular Table
 * @param {[]} data 
 */
const CreateModularTable = (data) => {
  const fileJson = {
    ...modularConfig,
    childModular: data
  }
  fs.writeFileSync(path('/modular.config.json'), JSON.stringify(fileJson, null, '  '))
  ModularTable(data)
}

/**
 * Modular Table
 * @param {[]} data 
 */
const ModularTable = (data) => {
  const tableModulars = createTable([
    chalk.green('PROJECT NAME'),
    chalk.green('PATH'),
  ])
  const modularStatus = data.map(item => {
    return [
      item.project_name,
      item.path,
    ]
  })
  tableModulars.push(...modularStatus)
  console.log(chalk.blue(`\nParent Modular: ${modularConfig.parentModular}\n`));
  console.log('  Modular Config Status:\n')
  console.log(tableModulars.toString());
  console.log('')
}

exports.ConfigAdd = ConfigAdd
exports.ConfigRemove = ConfigRemove
exports.CreateModularTable = CreateModularTable
exports.ModularTable = ModularTable