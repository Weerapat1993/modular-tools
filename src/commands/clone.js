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
  findProject(pwd, async (data, projectPath) => {
    const confirm = await inquirer.prompt([
      {
        type: INQUIRER.confirm,
        name: 'isConfirm',
        message: 'Do you want to copy src folder?'
      }
    ])
    if(confirm.isConfirm) {
      const file = new MakeFile(cmd, env, pwd)
      const pwdSrc = `${pwd}/src`
      const projectSrc = `${projectPath}/node_modules/${data.project_name}/src`

      file
        .removeFolder(projectSrc)
        .copyFolderTemplate(pwdSrc, projectSrc)
        .status()
    }
  }) 
}

module.exports = Clone