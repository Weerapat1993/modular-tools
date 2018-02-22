const inquirer = require('inquirer')
const { INQUIRER } = require('../config/command-list')
const { findProject, MakeFile } = require('../utils')
 
/**
 * Modular Clone
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Clone = async (pwd, cmd, env) => {
  findProject(pwd, async (child, parent) => {
    const confirm = await inquirer.prompt([
      {
        type: INQUIRER.confirm,
        name: 'isConfirm',
        message: 'Do you want to copy src folder?'
      }
    ])
    if(confirm.isConfirm) {
      const path = child.project_name === 'mascot' ? '/release' : '/src'
      const file = new MakeFile(cmd, env, pwd)
      const pwdSrc = `${pwd}${path}`
      const projectSrc = `${parent.path}/node_modules/${child.project_name}${path}`
      
      file
        .removeFolder(projectSrc)
        .copyFolderTemplate(pwdSrc, projectSrc)
        .status()
    }
  }) 
}

module.exports = Clone