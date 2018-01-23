const shell = require('shelljs')
const { MakeFile, Log, findProject } = require('../utils')
const log = new Log()

/**
 * Modular Clone
 * @param {stirng} pwd 
 * @param {string} cmd 
 * @param {stirng} env 
 */
const Commit = async (pwd, cmd, env) => {
  shell.exec('git status -s -u src', { async: true, silent: true }, (code, stdout, stderr) => {
    findProject(pwd, (child, parent) => {
      const dataArray = stdout.split('\n')
      const dataSrc = dataArray.filter(item => item.trim() !== '').map(item => item.split(' ').reverse()[0] )
      const childModular = dataSrc.map(item => `${pwd}/${item}`)
      const parentModular = dataSrc.map(item => `${parent.path}/node_modules/${child.project_name}/${item}`)
      if(dataSrc.length) {
        const file = new MakeFile(cmd, env, pwd)
        childModular.forEach((item, i) => {
          file.copyFile(childModular[i], parentModular[i])
        })
        file.status()
      } else {
        log.error('Error: file commit is not exists.')
      }
    })
  })
}

module.exports = Commit