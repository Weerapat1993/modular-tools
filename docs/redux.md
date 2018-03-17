## Redux Connector
[< Back](../README.md)

- เขียน Scope แยกการทำงานโดยเขียนในรูปแบบ High Order Component

**Short Hand**
```js
// productConnector.js
import { connect } from 'react-redux'
import { store } from '../utils'
import { fetchGithub } from '../redux/github'

export const withGitHub = connect(
  // mapStateToProps
  (state, ownProps) => ({
    data: store(state).github.search.data,
  }),
  // mapDispatchToProps
  {
    fetchGithub,
  }
)
```

**Full Option**
```js
// productConnector.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../utils'
import { fetchGithub } from '../redux/github'

export const withGitHub = (WrapperComponent) => {
  class HOC extends Component {
    componentDidMount() {
      this.props.fetchGithub()
    }

    render() {
      return <WrapperComponent {...this.props} />
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    data: store(state).github.search.data.filter(item => item.name === 'foo'),
    dataFunc: getGithubSearchFilterName('foo', state)
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchGithub: (keyword) => dispatch(githubSearchActions.fetchGithub(keyword))
  })
  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent)
}
```

**Usage**
```js
// ProductConnector.js
import { withGitHub } from '../github'

class ProductContainer extends Component {
  ...
}

export default withGithub(ProductContainer)
```

[< Back](../README.md)