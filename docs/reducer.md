## Reducer

[< Back](../README.md)

## Table of Contents
* [State in Reducer](#1-state-in-reducer)
* [Function Reducer](#2-function-reducer)
* [Class Reducer](#3-class-reducer)

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

### 2. Function Reducer

**Old**
```js
// InitalState
const initialState = {
  isFetching: false,
  isReload: true,
  error: '',
  data: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_FEED.REQUEST:
      return {
        ...state,
        keys: {
          [action.key]: {
            ...state.keys[action.key],
            isFetching: true,
            isReload: false,
            error: '',
          }
        }
      }
    case FETCH_FEED.SUCCESS:
      return {
        ...state,
        keys: {
          [action.key]: {
            ...state.keys[action.key],
            isFetching: false,
            isReload: false,
            error: '',
            data: action.data
          }
        }
      }
    case FETCH_FEED.FAILURE:
      return {
        ...state,
        keys: {
          [action.key]: {
            ...state.keys[action.key],
            isFetching: false,
            isReload: false,
            error: action.error.message,
          }
        }
      }
    default:
      return state
  }
}
```

### 3. Class Reducer

**[New] Class Redcuer**
```js
import { Reducer } from '../utils'

class FeedReducer extends Reducer {
  initialState = {
    isFetching: false,
    isReload: true,
    error: '',
    data: [],
  }

  getState() {
    const { type, data } = this.action
    switch(type) {
      case FETCH_FEED.REQUEST:
        return this.setStateWithKeyRequest()
      case FETCH_FEED.SUCCESS:
        return this.setStateWithKeySuccess({ data })
      case FETCH_FEED.FAILURE:
        return this.setStateWithKeyFailure()
      default:
        return this.state
    }
  }
}

export const feedReducer = classReducer(FeedReducer)
```

**Util Class Reducer**

* [initialState](#)
* [setState()](#)
* [getState()](#)
* [setStateWithKey()](#)
* [setStateWithKeyRequest()](#)
* [setStateWithKeySuccess()](#)
* [setStateWithKeyFailure()](#)
* [getStateWithKey()](#)
* [errorMessage()](#)
* [arrayToObject()](#)

[Back to Top](#table-of-contents)