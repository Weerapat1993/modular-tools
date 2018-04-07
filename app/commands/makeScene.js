const Case = require('case');
const { MakeFile2, Log } = require('../utils');
const Files = require('../assets/files');

// Make Component Command
const makeScene = (pwd, cmd, env) => {
  const file = new MakeFile2(cmd, env, pwd);
  const log = new Log();
  const envCamelCase = Case.camel(env);
  const envPascalCase = Case.pascal(env);

  file
    .createDirectory('')
    .createDirectory('/scenes')
    .createDirectory(`/scenes/${envCamelCase}`)
    .createFile(`/scenes/${envCamelCase}/index.js`, `import ${envPascalCase} from './${envPascalCase}'

export { ${envPascalCase} }
`)
    .createFile(`/scenes/${envCamelCase}/${envPascalCase}.js`, Files.Scene(envPascalCase));

  log.default('\nPlease add text info file ./src/scenes/index.js\n');
  log.success(`export { ${envPascalCase} } from './${envCamelCase}'\n`);
};

module.exports = makeScene;
