const Case = require('case');
const { MakeFile2, Log } = require('../utils');

// Make Component Command
const makeComponent = (pwd, cmd, env) => {
  const file = new MakeFile2(cmd, env, pwd);
  const log = new Log();
  // const envCamelCase = Case.camel(env);
  const envPascalCase = Case.pascal(env);

  file
    .createDirectory('')
    .createDirectory('/components')
    .createDirectory(`/components/${envPascalCase}`)
    .createFile(`/components/${envPascalCase}/index.js`, '')
    .createFile(`/components/${envPascalCase}/${envPascalCase}.js`, '')
    .createFile(`/components/${envPascalCase}/styles.js`, '');

  log.default('\nPlease add text info file ./src/components/index.js\n');
  log.success(`export { ${envPascalCase} } from './${envPascalCase}'\n`);
};

module.exports = makeComponent;
