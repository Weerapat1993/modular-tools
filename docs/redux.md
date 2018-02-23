## Redux in Folder Feature

[< Back](../README.md)

## Table of Contents
* [Actions](#1-actions)
* [Action Type](#2-action-types)
* [Connector](#3-connector)
* [Endpoints](#4-endpoints)
* [Reducer](#5-reducer)
* [Selector](#6-selector)
* [Utils](#7-utils)

### 3. Connector
**[New] Create Connector in Redux Folder (Best)**

Use theory `High Order Component`

**Short Hand**
```js
// productConnector.js
import { connect } from 'react-redux'
import { store } from '../utils'
import { fetchGithub } from '../redux/github'

export const withGitHub = (WrapperComponent) => (
  connect(
    // mapStateToProps
    (state, ownProps) => ({
      data: store(state).github.search.data,
    }),
    // mapDispatchToProps
    {
      fetchGithub,
    }
  )(WrapperComponent)
)
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
      this.props.fetchData()
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

[Back to Top](#table-of-contents)