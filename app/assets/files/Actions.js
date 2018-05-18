const Case = require('case');

exports.Actions = env => `import axios from 'axios'
import { FETCH_${Case.constant(env)}_LIST, FETCH_${Case.constant(env)}_DETAIL } from './${Case.camel(env)}ActionTypes'
import { API_ENDPOINT_${Case.constant(env)}_LIST, API_ENDPOINT_${Case.constant(env)}_DETAIL } from './${Case.camel(env)}Endpoints'

export const fetch${Case.pascal(env)}ListRequest = () => ({ type: FETCH_${Case.constant(env)}_LIST.REQUEST })
export const fetch${Case.pascal(env)}ListSuccess = data => ({ type: FETCH_${Case.constant(env)}_LIST.SUCCESS, data })
export const fetch${Case.pascal(env)}ListFailure = error => ({ type: FETCH_${Case.constant(env)}_LIST.FAILURE, error })
export const fetch${Case.pascal(env)}List = () => (dispatch) => {
  dispatch(fetch${Case.pascal(env)}ListRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    headers: {
      'X-Activity': 'get ${Case.pascal(env)} List',
    },
    url: API_ENDPOINT_${Case.constant(env)}_LIST(),
  })
    .then(res => dispatch(fetch${Case.pascal(env)}ListSuccess(res.data.data)))
    .catch(error => dispatch(fetch${Case.pascal(env)}ListFailure(error)))
}

export const fetch${Case.pascal(env)}DetailRequest = key => ({ type: FETCH_${Case.constant(env)}_DETAIL.REQUEST, key })
export const fetch${Case.pascal(env)}DetailSuccess = (data, key) => ({ type: FETCH_${Case.constant(env)}_DETAIL.SUCCESS, data, key })
export const fetch${Case.pascal(env)}DetailFailure = (error, key) => ({ type: FETCH_${Case.constant(env)}_DETAIL.FAILURE, error, key })
export const fetch${Case.pascal(env)}Detail = key => (dispatch) => {
  dispatch(fetch${Case.pascal(env)}DetailRequest(key))
  return axios({
    method: 'GET',
    responseType: 'json',
    headers: {
      'X-Activity': 'get ${Case.pascal(env)} Detail',
    },
    url: API_ENDPOINT_${Case.constant(env)}_DETAIL(key),
  })
    .then(res => dispatch(fetch${Case.pascal(env)}DetailSuccess(res.data.data, key)))
    .catch(error => dispatch(fetch${Case.pascal(env)}DetailFailure(error, key)))
}
`;
