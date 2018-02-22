# Constants

[< Back](../README.md)

## Table of Contents
* [Endpoints](#1-endpoints)

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

export const API_ENDPOINT = {
  FEEDS: () => API(API_VERSION_1, `/feeds`),
  FEED_BY_ID: (id) => API(API_VERSION_1, `/feed/${id}`),
}

// Usage
import { API_ENDPOINT } from '../config'

const url = API_ENDPOINT.FEEDS()
const urlByID = API_ENDPOINT.FEED_BY_ID(id)
```

[Back to Top](#table-of-contents)