const { ModularTable } = require('./config')
const modularConfig = require('../../modular.config.json')

/**
 * Modular Clone Config Add
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Status = async (pwd, cmd, env) => {
  const modulars = modularConfig.childModular
  ModularTable(modulars)
}

module.exports = Status