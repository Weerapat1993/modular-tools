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
    .createDirectory(`/features/${envCamelCase}/redux/connectors`)
    .createFile(`/features/${envCamelCase}/index.js`, `
export * from './components'
export * from './redux'`)
    .createFile(`/features/${envCamelCase}/components/index.js`, `
import ${envPascalCase}Container from './${envPascalCase}Container'

export { ${envPascalCase}Container }
`)
    .createFile(`/features/${envCamelCase}/components/styles.js`, Files.Style())
    .createFile(`/features/${envCamelCase}/components/${envPascalCase}Container.js`, Files.Component(`${envPascalCase}Container`))
    .createFile(`/features/${envCamelCase}/redux/index.js`, `
export * from './connectors'
export { ${envCamelCase}Reducer } from './${envCamelCase}Reducer'
export { ${envPascalCase}Selector } from './${envCamelCase}Selector'
`)
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Actions.js`, Files.Actions(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}ActionTypes.js`, Files.ActionTypes(env))
    .createFile(`/features/${envCamelCase}/redux/connectors/index.js`, `
export { with${envPascalCase}List } from './with${envPascalCase}List'
export { with${envPascalCase}Detail } from './with${envPascalCase}Detail'
`)
    .createFile(`/features/${envCamelCase}/redux/connectors/with${envPascalCase}List.js`, Files.ConnectorList(env, 'list'))
    .createFile(`/features/${envCamelCase}/redux/connectors/with${envPascalCase}Detail.js`, Files.ConnectorDetail(env, 'detail'))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Endpoints.js`, Files.Endpoints(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Reducer.js`, Files.Reducer(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Selector.js`, Files.Selector(env))
    .createFile(`/features/${envCamelCase}/redux/${envCamelCase}Utils.js`, '')
    // Model
    .createDirectory(`/features/${envCamelCase}/models`)
    .createFile(`/features/${envCamelCase}/models/${Case.pascal(env)}.js`, Files.Model(env));

  log.default('\nPlease add text info file ./src/views/features/index.js\n');
  log.success(`export * from './${envCamelCase}'\n`);
};

module.exports = makeFeature;
