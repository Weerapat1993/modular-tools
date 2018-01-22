const chalk = require('chalk')

class Log {
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
