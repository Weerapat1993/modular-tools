const fs = require('fs')
const fse = require('fs-extra')
const shell = require('shelljs')
const chalk = require('chalk')
const createTable = require('./createTable')
const Log = require('./Log')
const { parentModular } = require('../../modular.config.json')

class MakeFile extends Log {
  constructor(cmd, env, pwd) {
    super()
    this.cmd = cmd
    this.env = env || null
    this.pwd = pwd
    this.table = createTable(['', 'CHILD MODULAR', 'PARENT MODULAR'])
    this.data = []
  }

  createDirectory(pathName, hideLog) {
    const dir = pathName
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
      if(!hideLog) {
        this.success(`create directory ./src${pathName}`)
      }
    }
    return this
  } 
  

  createFile(pathName, text) {
    const dir = pathName
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, text)
      this.success(`create file ./src${pathName} success.`)
    } else {
      this.error(`file ./src${pathName} is exists.`)
    }
    return this
  }

  copyFolderTemplate(templateName, pathName) {
    const dirTemplate = templateName
    const dirSrc = pathName
    if (!fs.existsSync(dirSrc)) {
      this.createDirectory(pathName, true)
      fse.copySync(dirTemplate, dirSrc);
      this.success(`copy folder ${templateName} to ./src${pathName} success.`)
    } else {
      this.error(`folder ./src${pathName} is exists.`)
    }
    return this
  }

  copyFile(templateName, pathName) {
    if(!fs.existsSync(templateName)) {
      this.data.push([
        chalk.red('D'),
        chalk.red(templateName.replace(this.pwd, '')),
        '',
      ])
      return this
    }
    if (!fs.existsSync(pathName)) {
      fs.copyFileSync(templateName, pathName)
      // this.success(`[A] file ${templateName} to ${pathName} success.`)
      this.data.push([
        chalk.green('A'),
        chalk.green(templateName.replace(this.pwd, '')),
        chalk.green(pathName.replace(parentModular, '')),
      ])
    } else {
      fs.copyFileSync(templateName, pathName)
      // this.warning(`[M] file ${templateName} to ${pathName} success.`)
      this.data.push([
        chalk.yellowBright('M'),
        chalk.yellowBright(templateName.replace(this.pwd, '')),
        chalk.yellowBright(pathName.replace(parentModular, '')),
      ])
    }
    return this
  }

  removeFolder(pathName) {
    const dirSrc = pathName
    if (fs.existsSync(dirSrc)) {
      fse.removeSync(dirSrc)
      this.success(`remove file ./src${pathName} success.`)
    }
    return this
  }

  runCommand(commandName) {
    this.default('\n  Installing Node Modules ...\n')
    shell.exec(commandName, { async: true, silent: true }, (err, data, stderr) => {
      if (!err) {
         this.success('\n  Installing Node Modules success!\n', data)
      } else {
         this.error('Error', err)
      }
    })
    return this
  }

  status() {
    this.table.push(...this.data)
    console.log('\n  Commit Status:\n')
    console.log(this.table.toString());
    console.log('')
  }
}

module.exports = MakeFile
