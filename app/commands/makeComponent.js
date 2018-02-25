const Case = require('case');
const { MakeFile2, Log } = require('../utils');
const Files = require('../assets/files');

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
    .createFile(`/components/${envPascalCase}/index.js`, `import ${envPascalCase} from './${envPascalCase}'

export { ${envPascalCase} }
`)
    .createFile(`/components/${envPascalCase}/${envPascalCase}.js`, Files.componentText(envPascalCase))
    .createFile(`/components/${envPascalCase}/styles.js`, Files.stylesText());

  log.default('\nPlease add text info file ./src/components/index.js\n');
  log.success(`export { ${envPascalCase} } from './${envPascalCase}'\n`);
};

module.exports = makeComponent;
