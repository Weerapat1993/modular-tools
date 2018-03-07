# Constants

[< Back](../README.md)

## Table of Contents
* [Endpoints](#1-endpoints)
* [Action Types](#2-action-types)

### 1. Endpoints

**Bad**
```js
// src/constants/endpoint.js
import finallyApi from '../api'

export const API_ROOT = finallyApi.API_ROOT
export const API_VERSION_1 = '/api/v1'
export const FEEDS = '/feeds'
export const FEED = '/feed'

// Usage
import { API_ROOT, API_VERSION_1, FEEDS, FEED } from '../config'

const url = `${API_ROOT}${API_VERSION}${FEEDS}`
const urlByID = `${API_ROOT}${API_VERSION}${FEED}/${id}`
```

**Good**
```js
// src/constants/endpoint.js
import finallyApi from '../api'

const { API_ROOT } = finallyApi
const API = (VERSION, PATH) => `${API_ROOT}${VERSION}${PATH}`
const API_VERSION_1 = '/api/v1'

export const API_ENDPOINT_FEEDS = () => API(API_VERSION_1, `/feeds`)
export const API_ENDPOINT_FEED_BY_ID = (id) => API(API_VERSION_1, `/feeds/${id}`)

// Usage
import { API_ENDPOINT } from '../config'

const url = API_ENDPOINT_FEEDS()
const urlByID = API_ENDPOINT_FEED_BY_ID(id)
```

### 2. Action Types

**Bad**
```js
export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST'
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS'
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE'
```

**Good**
```js
const asyncActionType = (PATH) => ({
  REQUEST: `${PATH}_REQUEST`,
  SUCCESS: `${PATH}_SUCCESS`,
  FAILURE: `${PATH}_FAILURE`,
})

export const FETCH_FEED = asyncActionType('FETCH_FEED')
```

[Back to Top](#table-of-contents)