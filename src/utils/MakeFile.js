const fs = require('fs')
const fse = require('fs-extra')
const shell = require('shelljs')
const createTable = require('./createTable')
const Log = require('./Log')
const { parentModular } = require('../../modular.config.json')

class MakeFile extends Log {
  constructor(cmd, env, pwd) {
    super()
    this.cmd = cmd
    this.env = env || null
    this.pwd = pwd
    this.table = createTable([
      '', 
      this.git.add('CHILD MODULAR'), 
      this.git.add('PARENT MODULAR')
    ])
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
      this.data.push([
        this.git.copy('C'),
        this.git.copy(templateName.replace(this.pwd, '')),
        this.git.copy(pathName.replace(parentModular, '')),
      ])
    } else {
      this.error(`folder ./src${pathName} is exists.`)
    }
    return this
  }

  copyFile(templateName, pathName) {
    if(!fs.existsSync(templateName)) {
      this.data.push([
        this.git.delete('D'),
        this.git.delete(templateName.replace(this.pwd, '')),
        '',
      ])
      return this
    }
    if (!fs.existsSync(pathName)) {
      fs.copyFileSync(templateName, pathName)
      this.data.push([
        this.git.add('A'),
        this.git.add(templateName.replace(this.pwd, '')),
        this.git.add(pathName.replace(parentModular, '')),
      ])
    } else {
      fs.copyFileSync(templateName, pathName)
      this.data.push([
        this.git.merge('M'),
        this.git.merge(templateName.replace(this.pwd, '')),
        this.git.merge(pathName.replace(parentModular, '')),
      ])
    }
    return this
  }

  removeFolder(pathName) {
    const dirSrc = pathName
    if (fs.existsSync(dirSrc)) {
      fse.removeSync(dirSrc)
      this.data.push([
        this.git.delete('D'),
        this.git.delete(''),
        this.git.delete(pathName.replace(parentModular, '')),
      ])
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
    console.log('\nSymbol:')
    console.log(`
  ${this.git.add('A = Add')}
  ${this.git.copy('C = Copy')}
  ${this.git.merge('M = Merge')}
  ${this.git.delete('D = Delete')}
    `)
    console.log('Commit Status:\n')
    console.log(this.table.toString());
    console.log('')
  }
}

module.exports = MakeFile
