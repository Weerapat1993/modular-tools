const chalk = require('chalk');

const checkName = (value, callback) => {
  if (value) {
    callback();
  } else {
    console.log(chalk.red('Error: Please input [name] in command.'));
  }
};

module.exports = checkName;
