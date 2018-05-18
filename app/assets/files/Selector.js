const Case = require('case');

exports.Selector = env => `import { get } from 'lodash'
import { ${Case.pascal(env)} as Model } from '../models/${Case.pascal(env)}'

export class ${Case.pascal(env)}Selector {
  static defaultKeys = {
    isFetching: false,
    isReload: true,
    data: Model.set(),
    error: '',
  }

  /**
   * Get ${Case.pascal(env)} Lists
   * @param {Object} state state in store
   * @return {Object}
   */
  static getList(state) {
    const { ${Case.camel(env)} } = state
    const data = ${Case.camel(env)}.byID.map(key => ${Case.camel(env)}.keys[key].data)
    return {
      isFetching: ${Case.camel(env)}.isFetching,
      isReload: ${Case.camel(env)}.isReload,
      error: ${Case.camel(env)}.error,
      data,
    }
  }

  /**
   * Get ${Case.pascal(env)} by ID
   * @param {Object} state
   * @param {string} key
   * @return {typeof ${Case.pascal(env)}.defaultKeys}
   */
  static getByID(state, key) {
    return get(state.${Case.camel(env)}.keys, key, this.defaultKeys)
  }
}

export default ${Case.pascal(env)}Selector
`;
