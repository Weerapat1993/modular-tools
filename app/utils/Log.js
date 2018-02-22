const chalk = require('chalk')

class Log {
  constructor() {
    this.git = {
      add: (msg) => chalk.greenBright(msg),
      copy: (msg) => chalk.cyanBright(msg),
      merge: (msg) => chalk.yellowBright(msg),
      delete: (msg) => chalk.redBright(msg),
    }
  }

  default(msg) {
    console.log(msg)
  }

  success(msg) {
    console.log(chalk.green(msg))
  }

  warning(msg) {
    console.log(chalk.yellow(msg))
  }

  error(msg) {
    console.log(chalk.red(msg))
  }

  info(msg) {
    console.log(chalk.blue(msg))
  }
}

module.exports = Log
