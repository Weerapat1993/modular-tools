const Case = require('case');

exports.componentText = name => `import React, { Component } from 'react'

class ${name} extends Component {
  render() {
    return (
      <div>${name}</div>
    )
  }
}

export default ${name}
`;

exports.connectorText = env => `import { connect } from 'react-redux'
import { ${Case.pascal(env)} } from './${Case.camel(env)}Reducer'

export const with${Case.pascal(env)} = (WrapperComponent) => (
  connect (
    (state) => ({
      ${Case.camel(env)}: ${Case.pascal(env)}(state),
    }),
    {

    }
  )(WrapperComponent)
)
`;

exports.reducerText = env => `import { FETCH_${Case.upper(env)}_LIST } from './${Case.camel(env)}ActionTypes'

// InititalState
const initialState = {
  isFetching: false,
  isReload: true,
  data: [],
  error: '',
}

/**
 * ${Case.pascal(env)} Reducer
 * @param {initialState} state
 * @param {Object} action
 * @return {initialState}
 */
export const ${Case.camel(env)}Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_${Case.upper(env)}_LIST.REQUEST:
      return state
    case FETCH_${Case.upper(env)}_LIST.SUCCESS:
      return state
    case FETCH_${Case.upper(env)}_LIST.FAILURE:
      return state
    default:
      return state
  }
}

/**
 * ${Case.pascal(env)} Model
 * @param {Object} state
 * @return {initialState}
 */
export const ${Case.pascal(env)} = (state) => state.${Case.camel(env)}
`;

exports.actionsText = env => `import { FETCH_${Case.upper(env)}_LIST } from './${Case.camel(env)}ActionTypes'

export const fetch${Case.pascal(env)}ListRequest = () => ({ type: FETCH_${Case.upper(env)}_LIST.REQUEST }) 
export const fetch${Case.pascal(env)}ListSuccess = (data) => ({ type: FETCH_${Case.upper(env)}_LIST.SUCCESS, data }) 
export const fetch${Case.pascal(env)}ListFailure = (error) => ({ type: FETCH_${Case.upper(env)}_LIST.FAILURE, error }) 
export const fetch${Case.pascal(env)}List = () => (dispatch) => {
  dispatch(fetch${Case.pascal(env)}ListRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_${Case.upper(env)}_LIST(),
  })
    .then(res => dispatch(fetch${Case.pascal(env)}ListSuccess(res.data.data)))
    .catch(error => dispatch(fetch${Case.pascal(env)}ListFailure(error)))
}
`;

exports.stylesText = () => `
const styles = {
  container: {

  },
}

export default styles
`;
