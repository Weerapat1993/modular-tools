# Actions

[< Back](../README.md)

**Bad**
```js
const { API_ROOT } = finallyApi
const API_VERSION_1 = '/api/v1'
const API_ENDPOINT_FEEDS = '/feeds'

export const fetchFeed = () => (dispatch, getState) => {
  dispatch({ type: FETCH_FEED.REQUEST })
  return axios({
    method: 'GET',
    url: `${API_ROOT}${API_VERSION_1}${API_ENDPOINT_FEEDS}`,
    headers: {
      Authentication: token
    }
  })
    .then(res => dispatch({ type: FETCH_FEED.SUCCESS, data: res.data.data }))
    .catch(error => dispatch({ type: FETCH_FEED.FAILURE, error }))
}
```

**Good**
```js
const API_ENDPOINT_FEEDS = () => API_ENDPOINT(API_VERSION_1, '/feeds')

export const fetchFeedRequest = () => ({ type: FETCH_FEED.REQUEST })
export const fetchFeedSuccess = (data) => ({ type: FETCH_FEED.SUCCESS, data })
export const fetchFeedFailure = (error) => ({ type: FETCH_FEED.FAILURE, error })
export const fetchFeed = (status) => (dispatch, getState) => {
  dispatch(fetchFeedRequest())
  return axios({
    method: 'GET',
    url: API_ENDPOINT_FEEDS(status),
    headers: {
      Authentication: token
    }
  })
    .then(res => dispatch(fetchFeedSuccess(res.data.data)))
    .catch(error => dispatch(fetchFeedFailure(error)))
}
```

[< Back](../README.md)