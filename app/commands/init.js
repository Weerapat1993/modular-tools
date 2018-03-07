const shell = require('shelljs')
const inquirer = require('inquirer')
const { Log } = require('../utils')
const { INQUIRER } = require('../config/command-list')
const log = new Log()

const MODULAR_WEB = 'modular-web'
const MODULAR_MOBILE = 'modular-mobile'

/**
 * Modular Clone
 * @param {stirng} pwd s
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Init = async (pwd, cmd, env) => {
  if(env) {
    let GIT_PROJECT 
    const answer = await inquirer.prompt([
      {
        type: INQUIRER.list,
        name: "project",
        message: "What do you want?",
        choices: [
          MODULAR_WEB,
          MODULAR_MOBILE,
          new inquirer.Separator(),
        ],
      },
    ])
    switch(answer.project) {
      case MODULAR_WEB: 
        GIT_PROJECT = 'https://github.com/Weerapat1993/modular-web.git'
        break
      case MODULAR_MOBILE:
        GIT_PROJECT = 'https://github.com/Weerapat1993/modular-mobile.git'
        break
      default: 
        GIT_PROJECT = 'https://github.com/Weerapat1993/modular-web.git'
    }
    const CMD_RUN = `git clone ${GIT_PROJECT} ${env}`
    const CMD_RUN2 = `rm -rf ${env}/.git`
    shell.exec(CMD_RUN, { async: true }, () => {
      shell.exec(CMD_RUN2, { async: true }, () => {
        log.success(`Modular Project '${env}' clone success.\n`)
        log.default(`cd ${env}`)
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


