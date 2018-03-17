const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { path, createTable } = require('../utils')
const { INQUIRER, COMMANDS } = require('../config/command-list')
const modularConfig = require('../../modular.config.json')

/**
 * Modular Clone Config
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Config = async (pwd, cmd, env) => {
  const pkgJSON = fs.readJsonSync(`${pwd}/package.json`)
  const choices = modularConfig.childModular.map(item => item.project_name)
  const answer = await inquirer.prompt([
    {
      type: INQUIRER.list,
      name: "config_type",
      message: "What do you want?",
      choices: [
        ...Object.keys(COMMANDS).map((key) => COMMANDS[key]),
        new inquirer.Separator(),
      ],
    },
  ])
  switch(answer.config_type) {
    case COMMANDS.EDIT:
      console.log(`\n Old Path: ${chalk.blue(modularConfig.parentModular.path)}\n`)
      const project0 = await inquirer.prompt([
        {
          type: INQUIRER.input,
          name: 'name',
          message: "Input your `parent` project name?",
          default: pkgJSON.name,
          validate: (value) => {
            const childs = modularConfig.childModular
            const child = childs.filter(item => item.project_name === value)
            if(!child.length) {
              return true
            }
            return `Parent project name ${value} is exists.`
          }
        },
        {
          type: INQUIRER.input,
          name: 'path',
          message: "Input your `parent` path name?",
          default: pwd,
          validate: (value) => {
            const childs = modularConfig.childModular
            const child = childs.filter(item => item.path === value)
            if(!child.length) {
              return true
            }
            return `Parent project path is exists.`
          }
        }
      ])
      ConfigEdit(project0.path, project0.name)
      break
    case COMMANDS.ADD:
      const project = await inquirer.prompt([
        {
          type: INQUIRER.input,
          name: 'name',
          message: "Input your `child` project name?",
          default: pkgJSON.name,
          validate: (value) => {
            const childs = modularConfig.childModular
            const child = childs.filter(item => item.project_name === value)
            if(!child.length) {
              return true
            }
            return `Child project name ${value} is exists.`
          }
        },
        {
          type: INQUIRER.input,
          name: 'path',
          message: "Input your `child` path name?",
          default: pwd,
          validate: (value) => {
            const childs = modularConfig.childModular
            const child = childs.filter(item => item.path === value)
            if(!child.length) {
              return true
            }
            return `Child project path is exists.`
          }
        }
      ])
      ConfigAdd(project.path, cmd, project.name)
      break
    case COMMANDS.REMOVE:
      const project2 = await inquirer.prompt([
        {
          type: INQUIRER.list,
          name: 'name',
          message: "Please select project name for remove?",
          choices: [
            ...choices,
            new inquirer.Separator()
          ]
        }
      ])
      ConfigRemove(pwd, cmd, project2.name)
      break
    default:
  }
  if(answer.config_type !== 'Cancel') {
    await Config(pwd, cmd, env)
  }
}

/**
 * Modular Config Edit Project Name
 * @param {stirng} pathName 
 * @param {string} projectName 
 * @return {void}
 */
const ConfigEdit = async (pathName, projectName) => {
  const fileJson = {
    ...modularConfig,
    parentModular: {
      project_name: projectName,
      path: pathName
    }
  }
  fs.writeFileSync(path('/modular.config.json'), JSON.stringify(fileJson, null, '  '))
}

/**
 * Modular Config Add
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
  console.log(chalk.blue(`\nParent Modular: ${modularConfig.parentModular.path}\n`));
  console.log('  Modular Config Status:\n')
  console.log(tableModulars.toString());
  console.log('')
}

exports.Config = Config
exports.ConfigAdd = ConfigAdd
exports.ConfigRemove = ConfigRemove
exports.CreateModularTable = CreateModularTable
exports.ModularTable = ModularTable