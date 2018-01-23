const { findProject, MakeFile } = require('../utils')
 
/**
 * Modular Clone
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Clone = async (pwd, cmd, env) => {
  findProject(pwd, (data, projectPath) => {
    const file = new MakeFile(cmd, env, pwd)
    const pwdSrc = `${pwd}/src`
    const projectSrc = `${projectPath}/node_modules/${data.project_name}/src`

    file
      .removeFolder(projectSrc)
      .copyFolderTemplate(pwdSrc, projectSrc)
      .status()
  }) 
}

module.exports = Clone