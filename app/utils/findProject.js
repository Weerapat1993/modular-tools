const chalk = require('chalk')
const modularJSON = require('../../modular.config.json')

/**
 * Find Project
 * @param {string} pwd
 * @return {(child, parent) => void}
 */
const findProject = (pwd, callback) => {
  const parent = modularJSON.parentModular
  const checkProjectName = modularJSON.childModular.filter(item => item.path === pwd).length
  if(checkProjectName) {
    const child = modularJSON.childModular.filter(item => item.path === pwd)[0]
    callback(child, parent)
  } else {
    console.log(chalk.red('Error: cannot find project name'))
  }
}

/**
 * Find Child Modular Name
 * @param {string} pwd
 * @return {string}
 */
const childName = (pwd) => {
  const childData = modularJSON.childModular.filter(item => item.path === pwd)
  return childData.length ? childData[0].project_name : chalk.black('Not Found Project')
}

exports.findProject = findProject
exports.childName = childName