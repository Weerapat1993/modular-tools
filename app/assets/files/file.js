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
import { store } from '../../reducers'

export const with${Case.pascal(env)} = (WrapperComponent) => (
  connect (
    (state) => ({
      ${Case.camel(env)}: store(state).${Case.camel(env)},
    }),
    {

    }
  )(WrapperComponent)
)
`;
