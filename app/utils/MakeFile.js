const fs = require('fs-extra');
const shell = require('shelljs');
const createTable = require('./createTable');
const Log = require('./Log');
const { childName } = require('./findProject');
const { parentModular } = require('../../modular.config.json');

const { path } = parentModular;

class MakeFile extends Log {
  constructor(cmd, env, pwd) {
    super();
    this.cmd = cmd;
    this.env = env || null;
    this.pwd = pwd;
    this.table = createTable([
      '',
      this.git.add(childName(pwd)),
      this.git.add(parentModular.project_name),
    ]);
    this.data = [];
  }

  createDirectory(pathName, hideLog) {
    const dir = pathName;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      if (!hideLog) {
        this.success(`create directory ./src${pathName}`);
      }
    }
    return this;
  }

  createFile(pathName, text) {
    const dir = pathName;
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, text);
      this.success(`create file ./src${pathName} success.`);
    } else {
      this.error(`file ./src${pathName} is exists.`);
    }
    return this;
  }

  copyFolderTemplate(templateName, pathName) {
    const dirTemplate = templateName;
    const dirSrc = pathName;
    if (!fs.existsSync(dirSrc)) {
      this.createDirectory(pathName, true);
      fs.copySync(dirTemplate, dirSrc);
      this.data.push([
        this.git.copy('C'),
        this.git.copy(templateName.replace(this.pwd, '')),
        this.git.copy(pathName.replace(path, '')),
      ]);
    } else {
      this.error(`folder ./src${pathName} is exists.`);
    }
    return this;
  }

  copyFile(templateName, pathName) {
    if (!fs.existsSync(templateName)) {
      this.data.push([
        this.git.delete('D'),
        this.git.delete(templateName.replace(this.pwd, '')),
        '',
      ]);
      return this;
    }
    if (!fs.existsSync(pathName)) {
      fs.copyFileSync(templateName, pathName);
      this.data.push([
        this.git.add('A'),
        this.git.add(templateName.replace(this.pwd, '')),
        this.git.add(pathName.replace(path, '')),
      ]);
    } else {
      fs.copyFileSync(templateName, pathName);
      this.data.push([
        this.git.merge('M'),
        this.git.merge(templateName.replace(this.pwd, '')),
        this.git.merge(pathName.replace(path, '')),
      ]);
    }
    return this;
  }

  removeFolder(pathName) {
    const dirSrc = pathName;
    if (fs.existsSync(dirSrc)) {
      fs.removeSync(dirSrc);
      this.data.push([
        this.git.delete('D'),
        this.git.delete(''),
        this.git.delete(pathName.replace(path, '')),
      ]);
    }
    return this;
  }

  runCommand(commandName) {
    this.default('\n  Installing Node Modules ...\n')
    shell.exec(commandName, { async: true, silent: true }, (err, data) => {
      if (!err) {
        this.success('\n  Installing Node Modules success!\n', data);
      } else {
        this.error('Error', err);
      }
    });
    return this;
  }

  status() {
    this.table.push(...this.data);
    console.log('\nSymbol:');
    console.log(`
  ${this.git.add('A = Add')}
  ${this.git.copy('C = Copy')}
  ${this.git.merge('M = Merge')}
  ${this.git.delete('D = Delete')}
    `);
    console.log('Commit Status:\n');
    console.log(this.table.toString());
    console.log('');
  }
}

module.exports = MakeFile;
