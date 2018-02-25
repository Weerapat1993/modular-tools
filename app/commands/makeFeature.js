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
import ${envPascalCase}Container from './${envPascalCase}Container'

export { ${envPascalCase}Container }
`)
    .createFile(`/features/${envCamelCase}/components/styles.js`, Files.stylesText())
    .createFile(`/features/${envCamelCase}/components/${envPascalCase}Container.js`, Files.componentText(`${envPascalCase}Container`))
    .createFile(`/features/${envCamelCase}/redux/index.js`, `
export { with${envPascalCase} } from './${envCamelCase}Connector'
export { ${envCamelCase}Reducer, ${envPascalCase} } from './${envCamelCase}Reducer'
`)
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Actions.js`, Files.actionsText(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}ActionTypes.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Connector.js`, Files.connectorText(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Endpoints.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Reducer.js`, Files.reducerText(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Selector.js`, '')
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Utils.js`, '');

  log.default('\nPlease add text info file ./src/views/features/index.js\n');
  log.success(`export * from './${envCamelCase}'\n`);
};

module.exports = makeFeature;
