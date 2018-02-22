const fs = require('fs');
const shell = require('shelljs');
const Log = require('./Log');

const srcPath = (pathName, pwd) => `${pwd}/src${pathName}`;

class MakeFile2 extends Log {
  constructor(cmd, env, pwd) {
    super();
    this.cmd = cmd;
    this.env = env || null;
    this.pwd = pwd;
  }

  createDirectory(pathName, hideLog) {
    const dir = srcPath(pathName, this.pwd);
    if (!fs.existsSync(dir)) {
      shell.mkdir(dir);
      if (!hideLog) {
        this.success(`create directory ./src${pathName}`);
      }
    }
    return this;
  }

  createFile(pathName, text) {
    const dir = srcPath(pathName, this.pwd);
    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, text);
      this.success(`create file ./src${pathName} success.`);
    } else {
      this.error(`file ./src${pathName} is exists.`);
    }
    return this;
  }
}

module.exports = MakeFile2;
