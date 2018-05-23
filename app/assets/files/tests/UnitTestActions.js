const Case = require('case');

const key = (env) => `${Case.camel(env)}ID`
const endpoint = (env) => `API_ENDPOINT_FETCH_${Case.constant(env)}`

exports.UnitTestActions = env => `import nock from 'nock'
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  fetch${Case.pascal(env)},
  fetch${Case.pascal(env)}Request,
  fetch${Case.pascal(env)}Success,
  fetch${Case.pascal(env)}Failure,
} from '../${Case.camel(env)}Actions'
import { configToken } from '../../../../../config'
import { ${endpoint(env)} } from '../../../../../constants/endpoint'
import { defaultStore } from '../mockData/data'

// set configureMockStore
const middlewares = [
  thunk,
  thunk.withExtraArgument(axios)
]
const mockStore = configureMockStore(middlewares)
const mockDefaultStore = mockStore(defaultStore)

// Unmock Axios
jest.unmock('axios')

// Constants
const ${key(env)} = '${Case.camel(env)}:12345'
const successResponse = data => ({
  data,
  code: 200,
  status: 'OK'
})

const errorResponse = {
  code: 404,
  error: {
    message: 'Data is not found'
  }
}

const error404 = new Error('Request failed with status code 404')

describe('Action ${Case.camel(env)}Actions.js', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('check asyncronous function fetch${Case.pascal(env)} [SUCCESS]', () => {
    nock(${endpoint(env)}(${key(env)}))
      .defaultReplyHeaders({
        'Content-Type': 'application/json',
        Authorization: configToken.getToken(defaultStore)
      })
      .get('')
      .reply(200, JSON.stringify(successResponse({})))
    const store = mockDefaultStore
    store.clearActions()
    const expected = [
      fetch${Case.pascal(env)}Request(${key(env)}),
      fetch${Case.pascal(env)}Success({}, ${key(env)}),
    ]

    return store.dispatch(fetch${Case.pascal(env)}(${key(env)}))
      .then(() => {
        const recieved = store.getActions()
        expect(recieved).toEqual(expected)
      })
  })
  it('check asyncronous function fetch${Case.pascal(env)} [FAILURE]', () => {
    nock(${endpoint(env)}(${key(env)}))
      .defaultReplyHeaders({
        'Content-Type': 'application/json',
        Authorization: configToken.getToken(defaultStore)
      })
      .get('')
      .reply(404, errorResponse)
    const store = mockDefaultStore
    store.clearActions()
    const expected = [
      fetch${Case.pascal(env)}Request(${key(env)}),
      fetch${Case.pascal(env)}Failure(error404, ${key(env)}),
    ]

    return store.dispatch(fetch${Case.pascal(env)}(${key(env)}))
      .then(() => {
        const recieved = store.getActions()
        expect(recieved).toEqual(expected)
      })
  })
})
`