## Reducer

[< Back](../README.md)

## Table of Contents
* [State in Reducer](#1-state-in-reducer)
* [Reducer Function](#2-reducer-function)
* [Util Class Reducer](#3-util-class-reducer)

### 1. State in Reducer

```js
const initialState = {
  // Normal State
  isFetching: false, // check loading data (default: false)
  isReload: true, // check reloading data (default: true)
  error: '', // check error message (default: '')
  data: [], // data response from api 

  // Normalize State with Key Object
  byID: ['key1', 'key2'], // data for map or sort (default: [])
  keys: {
    'key1': {
      isFetching: false, // check loading data (default: false)
      isReload: true, // check reloading data (default: true)
      error: '', // check error message (default: '')
      data: [], // data response from api 
    },
    'key2': {
      isFetching: false, // check loading data (default: false)
      isReload: true, // check reloading data (default: true)
      error: '', // check error message (default: '')
      data: [], // data response from api 
    },
  }
}
```

### 2. Reducer Function

**Bad**
```js
// InitalState
const initialState = {
  isFetching: false,
  error: '',
  data: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_FEED.REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_FEED.SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        data: action.data
      }
    case FETCH_FEED.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error.message
      }
    default:
      return state
  }
}
```

**Good**
```js
import { Reducer } from '../utils'

// InitalState
const initialState = {
  isFetching: false,
  isReload: true,
  error: '',
  data: [],
}

/**
 * @param {initialState} state
 * @param {{ type: string, data: any, error: Error }} action
 * @return {initialState}
 */
export const feedReducer = (state = initialState, action) => {
  const reducer = new Reducer(state, action)
  switch(action.type) {
    case FETCH_FEED.REQUEST:
      return reducer.getRequest()
    case FETCH_FEED.SUCCESS:
      return reducer.fetchFeedSuccess()
    case FETCH_FEED.FAILURE:
      return reducer.getFailure()
    default:
      return state
  }
}
```

**[New] Class Redcuer (Best)**
```js
import { Reducer } from '../utils'

// InitalState
const initialState = {
  isFetching: false,
  isReload: true,
  error: '',
  data: [],
}

class FeedReducer extends Reducer {
  getState() {
    const { type, data } = this.action
    switch(type) {
      case FETCH_FEED.REQUEST:
        return this.getRequest()
      case FETCH_FEED.SUCCESS:
        return this.fetchFeedSuccess({ data })
      case FETCH_FEED.FAILURE:
        return this.getFailure()
      default:
        return this.state
    }
  }
}

/** @type {initialState} */
export const feedReducer = classReducer(FeedReducer, initialState)
```


### 3. Util Class Reducer

* [Reducer.js](../src/utils/Reducer/Reducer.js)
  * [setState()](#)
  * [getRequest()](#)
  * [getSuccess()](#)
  * [getFailure()](#)
* [NormalizeReducer.js](#)
  * [setState()](#)
  * [getState()](#)
  * [setStateWithKey()](#)
  * [getRequestWithKey()](#)
  * [getSuccessWithKey()](#)
  * [getFailureWithKey()](#)
* [FullStackReducer.js](#)
  * [setState()](#)
  * [getState()](#)
  * [setStateWithKey()](#)
  * [getRequest()](#)
  * [getSuccess()](#)
  * [getFailure()](#)
  * [getRequestWithKey()](#)
  * [getSuccessWithKey()](#)
  * [getFailureWithKey()](#)

[Back to Top](#table-of-contents)