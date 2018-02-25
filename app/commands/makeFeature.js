const Case = require('case');
const { MakeFile2, Log } = require('../utils');
const Files = require('../assets/files');

// Make Component Command
const makeFeature = (pwd, cmd, env) => {
  const file = new MakeFile2(cmd, env, pwd);
  const log = new Log();
  const envCamelCase = Case.camel(env);
  const envPascalCase = Case.pascal(env);

  file
    .createDirectory('')
    .createDirectory('/features')
    .createDirectory(`/features/${envCamelCase}`)
    .createDirectory(`/features/${envCamelCase}/components`)
    .createDirectory(`/features/${envCamelCase}/redux`)
    .createFile(`/features/${envCamelCase}/index.js`, `
export * from './components'
export * from './redux'`)
    .createFile(`/features/${envCamelCase}/components/index.js`, `
import ${envPascalCase}Home from './${envPascalCase}Home'
import ${envPascalCase}Create from './${envPascalCase}Create'

export default {
  Home: ${envPascalCase}Home,
  Create: ${envPascalCase}Create,
}
`)
    .createFile(`/features/${envCamelCase}/components/${envPascalCase}Home.js`, Files.componentText(`${envPascalCase}Home`))
    .createFile(`/features/${envCamelCase}/components/${envPascalCase}Create.js`, Files.componentText(`${envPascalCase}Home`))
    .createFile(`/features/${envCamelCase}/redux/index.js`, `export { with${envPascalCase} } from './${envCamelCase}Connector'`)
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Actions.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}ActionTypes.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Connector.js`, Files.connectorText(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Endpoints.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Reducer.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Selector.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Utils.js`, '');

  log.default('\nPlease add text info file ./src/views/features/index.js\n');
  log.success(`export { ${envPascalCase}Container } from './${envCamelCase}'\n`);
};

module.exports = makeFeature;
