const Case = require('case');
const { MakeFile2, Log } = require('../utils');

// Make Component Command
const makeUtil = (pwd, cmd, env) => {
  const file = new MakeFile2(cmd, env, pwd);
  const log = new Log();
  const envCamelCase = Case.camel(env);
  const envKebab = Case.kebab(env);

  file
    .createDirectory('')
    .createDirectory('/utils')
    .createDirectory(`/utils/${envKebab}`)
    .createFile(`/utils/${envKebab}/index.js`, '')
    .createFile(`/utils/${envKebab}/${envCamelCase}.js`, '');

  log.default('\nPlease add text info file ./src/utils/index.js\n');
  log.success(`export { ${envCamelCase} } from './${envKebab}'\n`);
};

module.exports = makeUtil;
