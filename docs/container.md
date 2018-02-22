# Container

[< Back](../README.md)

## Table of Contents
* [mapStateToProps](#1-mapstatetoprops)
* [mapDispatchToProps](#2-mapdispatchtoprops)

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

[Back to Top](#table-of-contents)