const Case = require('case');
const { MakeFile2, Log } = require('../utils');
const Files = require('../assets/files');

// Make Component Command
const makePage = (pwd, cmd, env) => {
  const file = new MakeFile2(cmd, env, pwd);
  const log = new Log();
  const envCamelCase = Case.camel(env);
  const envPascalCase = Case.pascal(env);

  file
    .createDirectory('')
    .createDirectory('/pages')
    .createDirectory(`/pages/${envCamelCase}`)
    .createFile(`/pages/${envCamelCase}/index.js`, `
import ${envPascalCase}Home from './${envPascalCase}Home'
import ${envPascalCase}Create from './${envPascalCase}Create'

export default {
  Home: ${envPascalCase}Home,
  Create: ${envPascalCase}Create,
}
`)
    .createFile(`/pages/${envCamelCase}/${envPascalCase}Home.js`, Files.componentText(`${envPascalCase}Home`))
    .createFile(`/pages/${envCamelCase}/${envPascalCase}Create.js`, Files.componentText(`${envPascalCase}Create`))

  log.default('\nPlease add text info file ./src/pages/index.js\n');
  log.success(`export ${envPascalCase} from './${envCamelCase}'\n`);
};

module.exports = makePage;
