const Case = require('case');

exports.Reducer = env => `import { FETCH_${Case.constant(env)}_LIST, FETCH_${Case.constant(env)}_DETAIL } from './${Case.camel(env)}ActionTypes'
import { classReducer, Reducer } from '../../utils'
import { ${Case.pascal(env)} as Model } from '../../../models/${Case.pascal(env)}'

/**
 * @class ${Case.pascal(env)}Reducer
 */
export class ${Case.pascal(env)}Reducer extends Reducer {
  // InitialState
  initialState = {
    keys: {},
    byID: [],
    isFetching: false,
    isReload: true,
    error: '',
  }

  getState() {
    const { type, data } = this.action
    switch (type) {
      case FETCH_${Case.constant(env)}_LIST.REQUEST:
        return this.state
      case FETCH_${Case.constant(env)}_LIST.SUCCESS:
        return this.state
      case FETCH_${Case.constant(env)}_LIST.FAILURE:
        return this.state
      case FETCH_${Case.constant(env)}_DETAIL.REQUEST:
        return this.setStateWithKeyRequest({ data: Model.set() })
      case FETCH_${Case.constant(env)}_DETAIL.SUCCESS:
        return this.setStateWithKeySuccess({ data: Model.set(data) })
      case FETCH_${Case.constant(env)}_DETAIL.FAILURE:
        return this.setStateWithKeyFailure()
      default:
        return this.state
    }
  }
}

export const ${Case.camel(env)}Reducer = classReducer(${Case.pascal(env)}Reducer)
`;
