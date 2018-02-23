const Case = require('case');
const { MakeFile2, Log } = require('../utils');

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
    .createFile(`/common/${envPascalCase}/${envPascalCase}.js`, '')
    .createFile(`/common/${envPascalCase}/styles.js`, `
const styles = {
  container: {

  },
}

export default styles
`);

  log.default('\nPlease add text info file ./src/common/index.js\n');
  log.success(`export { ${envPascalCase} } from './${envPascalCase}'\n`);
};

const commonIndex = 

module.exports = makeCommon;
