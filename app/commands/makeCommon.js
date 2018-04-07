const Case = require('case');
const { MakeFile2, Log } = require('../utils');
const Files = require('../assets/files');

// Make Component Command
const makeCommon = (pwd, cmd, env) => {
  const file = new MakeFile2(cmd, env, pwd);
  const log = new Log();
  // const envCamelCase = Case.camel(env);
  const envPascalCase = Case.pascal(env);

  file
    .createDirectory('')
    .createDirectory('/common')
    .createDirectory(`/common/${envPascalCase}`)
    .createFile(`/common/${envPascalCase}/index.js`, `import ${envPascalCase} from './${envPascalCase}'

export { ${envPascalCase} }
`)
    .createFile(`/common/${envPascalCase}/${envPascalCase}.js`, Files.Component(envPascalCase))
    .createFile(`/common/${envPascalCase}/styles.js`, Files.Style());

  log.default('\nPlease add text info file ./src/common/index.js\n');
  log.success(`export { ${envPascalCase} } from './${envPascalCase}'\n`);
};

module.exports = makeCommon;
