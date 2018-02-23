# Container

[< Back](../README.md)

## Table of Contents
* [mapStateToProps](#1-mapstatetoprops)
* [mapDispatchToProps](#2-mapdispatchtoprops)
* [Use Connector](#3-use-connector)

### 1. mapStateToProps
**Bad**
```js
const mapStateToProps = (state, ownProps) => {
  const data = state.github.search.data.filter(item => item.name === 'foo')
  return {
    data
  }
}
```

**Good**
```js
const mapStateToProps = (state, ownProps) => ({
  data: store(state).github.search.data.filter(item => item.name === 'foo'),
  dataFunc: getGithubSearchFilterName('foo', state)
})
```

### 2. mapDispatchToProps
**Bad**
```js
import { fetchGithub } from '../redux/github'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGithub: (keyword) => {
      dispatch(fetchGithub(keyword))
    }
  }
}
```

**Good**
```js
import * as githubSearchActions from '../redux/github'

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGithub: (keyword) => dispatch(githubSearchActions.fetchGithub(keyword))
})
```

### 3. Use Connector
**[New] Create Connector in Redux Folder (Best)**

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

```js
// ProductConnector.js
import { withGitHub } from '../github'

class ProductContainer extends Component {
  ...
}

export default withGithub(ProductContainer)
```

[Back to Top](#table-of-contents)