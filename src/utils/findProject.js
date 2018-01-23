const chalk = require('chalk')
const modularJSON = require('../../modular.config.json')

/**
 * Find Project
 * @param {string} pwd
 * @return {() => void}
 */
const findProject = (pwd, callback) => {
  const projectPath = modularJSON.parentModular
  const checkProjectName = modularJSON.childModular.filter(item => item.path === pwd).length
  if(checkProjectName) {
    const data = modularJSON.childModular.filter(item => item.path === pwd)[0]
    callback(data, projectPath)
  } else {
    console.log(chalk.red('Error: cannot find project name'))
  }
}

module.exports = findProject