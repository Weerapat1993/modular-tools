exports.Component = name => `import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

class ${name} extends Component {
  static propTypes = {
    data: PropTypes.string,
  }

  static defaultProps = {
    data: '',
  }

  render() {
    return (
      <div>${name}</div>
    )
  }
}

export default ${name}
`;
