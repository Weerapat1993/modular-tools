## JSDoc

[< Back](../README.md)

* Add Comment `JsDoc` in All Class & Functiion

**Function**
```js
// exampleReducer.js

/** 
 * @typedef {Object} Action
 * @property {string} type
 * @property {string} error
 * @property {Array.<Object>} data
 */

const initialState = {
  isFetching: false,
  isReload: false,
  error: '',
  data: [],
}

/**
 * Example Reducer
 * @param {initialState} state
 * @param {Action} action
 * @return {initialState}
 */
const exampleReducer = (state, action) => {
  return state
}
```

**Class**
```js
// Reducer.js

/**
 * Reducer Class
 * @example
 * ```js
 * const reducer = new Reducer(state, action)
 * ```
 * @typedef {Array.<Object>|Object} Data
 * 
 * @typedef {Object} State
 * @property {boolean} isFetching
 * @property {boolean} isReload
 * @property {string} error
 * @property {Data} data
 * 
 * @typedef {Object} Action
 * @property {string} type
 * @property {string} key
 * @property {Data} data
 * @property {Error} error
 */
export class Reducer {
  /**
   * Reducer Constructor
   * @param {State} state 
   * @param {Action} action 
   */
  constructor(state, action) {
    this.state = state
    this.action = action
  }

  /**
   * Set state in Reducer
   * @param {Object} newState
   * @return {State}
   */
  setState(newState) {
    return {
      ...this.state,
      ...newState,
    }
  }

  /**
   * getState Request Case in Reducer
   * @return {State}
   */
  getRequest() {
    return this.setState({
      isFetching: true,
      error: '',
      isReload: false
    })
  }

  /**
   * getState Failure Case in Reducer
   * @return {State}
   */
  getFailure() {
    return this.setState({
      isFetching: false,
      error: this.action.error.message
    })
  }
}

export default Reducer
```

[< Back](../README.md)