const shell = require('shelljs')
const chalk = require('chalk')
const { MakeFile } = require('../utils')
const modularJSON = require('../../modular.config.json')

/**
 * Modular Clone
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Clone = async (pwd, cmd, env) => {
  shell.exec('git status -s -u src', { async: true, silent: true }, (code, stdout, stderr) => {
    const checkProjectName = modularJSON.childModular.filter(item => item.path === pwd).length
    if(checkProjectName) {
      const projectPath = modularJSON.parentModular
      const projectName = modularJSON.childModular.filter(item => item.path === pwd)[0].project_name
      const data = stdout.split('\n')
      const dataSrc = data.filter(item => item.trim() !== '').map(item => item.split(' ').reverse()[0] )
      const childModular = dataSrc.map(item => `${pwd}/${item}`)
      const parentModular = dataSrc.map(item => `${projectPath}/node_modules/${projectName}/${item}`)
      // console.log(JSON.stringify(childModular, null, '  '))
      // console.log(JSON.stringify(parentModular, null, '  '))
      const file = new MakeFile(cmd, env, pwd)
      childModular.forEach((item, i) => {
        file.copyFile(childModular[i], parentModular[i])
      })
      file.status()
    } else {
      console.log(chalk.red('Error: cannot find project name'))
    }
  })
}

module.exports = Clone