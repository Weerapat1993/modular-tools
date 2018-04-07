const Case = require('case');

// Connector List
exports.ConnectorList = (env, type) => `import React, { Component } from 'react'
import { func, shape, bool, string } from 'prop-types'
import { connect } from 'react-redux'
import { fetch${Case.pascal(env)}${Case.pascal(type)} } from '../${Case.camel(env)}Actions'
import { ${Case.pascal(env)}Selector as Selector } from '../${Case.camel(env)}Selector'
import { ErrorHandling } from '../../../../components'
import { ${Case.pascal(env)} as Model } from '../../../../models/${Case.pascal(env)}'

export const with${Case.pascal(env)}${Case.pascal(type)} = (WrapperComponent) => {
  class HOC extends Component {
    static propTypes = {
      // Connect Store
      ${Case.camel(env)}: shape({
        isFetching: bool,
        isReload: bool,
        error: string,
        data: Model.setPropTypes(),
      }).isRequired,
      fetch${Case.pascal(env)}${Case.pascal(type)}: func.isRequired,
    }

    constructor() {
      super()

      this.handleReload = this.handleReload.bind(this)
    }

    componentDidMount() {
      const { ${Case.camel(env)} } = this.props
      if(${Case.camel(env)}.isReload) {
        this.handleReload()
      }
    }

    handleReload() {
      this.props.fetch${Case.pascal(env)}${Case.pascal(type)}()
    }

    render() {
      const { ${Case.camel(env)} } = this.props
      return (
        <ErrorHandling
          isFetching={${Case.camel(env)}.isFetching}
          error={${Case.camel(env)}.error}
          onReload={this.handleReload}
        >
           <WrapperComponent {...this.props} />
        </ErrorHandling>
      )
    }
  }

  const mapStateToProps = state => ({
    ${Case.camel(env)}: Selector.getList(state),
  })

  const mapDispatchToProps = {
    fetch${Case.pascal(env)}${Case.pascal(type)},
  }

  return connect(mapStateToProps, mapDispatchToProps)(HOC)
}

export default with${Case.pascal(env)}${Case.pascal(type)}
`;

// Connector Detail
exports.ConnectorDetail = (env, type) => `import React, { Component } from 'react'
import { func, shape, bool, string } from 'prop-types'
import { connect } from 'react-redux'
import { fetch${Case.pascal(env)}${Case.pascal(type)} } from '../${Case.camel(env)}Actions'
import { ${Case.pascal(env)}Selector as Selector } from '../${Case.camel(env)}Selector'
import { ErrorHandling } from '../../../../components'
import { ${Case.pascal(env)} as Model } from '../../../../models/${Case.pascal(env)}'

export const with${Case.pascal(env)}${Case.pascal(type)} = (WrapperComponent) => {
  class HOC extends Component {
    static propTypes = {
      // Props Data
      ${Case.camel(env)}ID: string,
      // Connect Store
      ${Case.camel(env)}: shape({
        isFetching: bool,
        isReload: bool,
        error: string,
        data: Model.setPropTypes(),
      }).isRequired,
      fetch${Case.pascal(env)}${Case.pascal(type)}: func.isRequired,
    }

    constructor() {
      super()

      this.handleReload = this.handleReload.bind(this)
    }

    componentDidMount() {
      const { ${Case.camel(env)} } = this.props
      if(${Case.camel(env)}.isReload) {
        this.handleReload()
      }
    }

    handleReload() {
      const { ${Case.camel(env)}ID } = this.props
      this.props.fetch${Case.pascal(env)}${Case.pascal(type)}(${Case.camel(env)}ID)
    }

    render() {
      const { ${Case.camel(env)} } = this.props
      return (
        <ErrorHandling
          isFetching={${Case.camel(env)}.isFetching}
          error={${Case.camel(env)}.error}
          onReload={this.handleReload}
        >
           <WrapperComponent {...this.props} />
        </ErrorHandling>
      )
    }
  }

  const mapStateToProps = (state, { ${Case.camel(env)}ID }) => ({
    ${Case.camel(env)}: Selector.getByID(state, ${Case.camel(env)}ID),
  })

  const mapDispatchToProps = {
    fetch${Case.pascal(env)}${Case.pascal(type)},
  }

  return connect(mapStateToProps, mapDispatchToProps)(HOC)
}

export default with${Case.pascal(env)}${Case.pascal(type)}
`;
