const shell = require('shelljs')
const { Log } = require('../utils')
const log = new Log()

/**
 * Modular Clone
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Init = async (pwd, cmd, env) => {
  if(env) {
    shell.exec(`sudo ssh-add ~/.ssh/id_rsa`, { async: true }, () => {
      shell.exec(`git clone git@bitbucket.org:dotography-code/scale-modular-kit.git ${env}`, { async: true }, (code, stdout, stderr) => {
        log.success(`Modular Project '${env}' clone success.\n`)
        log.success(``)
        log.default(`cd ${env}`)
        log.default('rm -rf .git')
        log.default(`yarn`)
      }) 
    })
  } else {
    log.error('Please require `project_name`\n')
    log.default(' - Example -')
    log.default(`modular init <project_name>\n`)
  }
}

module.exports = Init


