const shell = require('shelljs')
const { Log } = require('../utils')
const log = new Log()

// Git Project
const GIT_PROJECT = 'git@bitbucket.org:dotography-code/scale-modular-kit.git'

/**
 * Modular Clone
 * @param {stirng} pwd s
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Init = async (pwd, cmd, env) => {
  if(env) {
    shell.exec(`git clone ${GIT_PROJECT} ${env}`, { async: true }, (code, stdout, stderr) => {
      if(!stderr) {
        log.success(`Modular Project '${env}' clone success.\n`)
        log.success(``)
        log.default(`cd ${env}`)
        log.default('rm -rf .git')
        log.default(`yarn`)
      } else {
        log.error(`Error: clone project failure.`)
      }
    })
  } else {
    log.error('Please require `project_name`\n')
    log.default(' - Example -')
    log.default(`modular init <project_name>\n`)
  }
}

module.exports = Init


