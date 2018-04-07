const Case = require('case');
const { MakeFile2, Log } = require('../utils');
const Files = require('../assets/files');

// Make Component Command
const makeModel = (pwd, cmd, env) => {
  const file = new MakeFile2(cmd, env, pwd);
  const log = new Log();

  file
    .createDirectory('')
    .createDirectory('/models')
    .createFile(`/models/${Case.pascal(env)}.js`, Files.Model(env));

  log.default('\nPlease add text info file ./src/models/index.js\n');
  log.success(`export { ${Case.pascal(env)} } from './${Case.pascal(env)}'\n`);
};

module.exports = makeModel;
