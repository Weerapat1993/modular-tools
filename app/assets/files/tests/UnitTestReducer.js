const Case = require('case');

exports.UnitTestReducer = env => `import { ${Case.camel(env)}Reducer, ${Case.camel(env)}Reducer } from '../${Case.camel(env)}Reducer'
import {
  fetch${Case.pascal(env)}Request,
  fetch${Case.pascal(env)}Success,
  fetch${Case.pascal(env)}Failure,
} from '../${Case.pascal(env)}Actions'
import { ${Case.pascal(env)} as Model } from '../../models/${Case.pascal(env)}'

// Error
const error = new Error('Error')

describe('${Case.camel(env)}Reducer.js', () => {
  const classReducer = (action, state) => new ${Case.camel(env)}Reducer({ action, state })._setInitial()
  it('should be display initialState', () => {
    const action = { type: 'ETC' }
    const recieved = ${Case.camel(env)}Reducer(undefined, action)
    const expected = classReducer(action).initialState
    expect(recieved).toEqual(expected)
  })

  it('action FETCH_REFUND_DETAIL_REQUEST', () => {
    const action = fetch${Case.pascal(env)}Request('key')
    const recieved = ${Case.camel(env)}Reducer(undefined, action)
    const expected = classReducer(action).setStateWithKeyRequest()
    expect(recieved).toEqual(expected)
  })

  it('action FETCH_REFUND_DETAIL_SUCCESS', () => {
    const data = Model.setDefaultProps()
    const action = fetch${Case.pascal(env)}Success(data, 'key')
    const recieved = ${Case.camel(env)}Reducer(undefined, action)
    const expected = classReducer(action).setStateWithKeySuccess({ data })
    expect(recieved).toEqual(expected)
  })

  it('action FETCH_REFUND_DETAIL_FAILURE', () => {
    const action = fetch${Case.pascal(env)}Failure(error, 'key')
    const recieved = ${Case.camel(env)}Reducer(undefined, action)
    const expected = classReducer(action).setStateWithKeyFailure()
    expect(recieved).toEqual(expected)
  })
})
`

