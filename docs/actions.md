# Actions

[< Back](../README.md)

**Bad**
```js
export const fetchFeed = () => (dispatch, getState) => {
  dispatch({ type: FETCH_FEED.REQUEST })
  return axios({
    method: 'GET',
    url: 'localhost:8000/api/feeds',
  })
    .then(res => dispatch({ type: FETCH_FEED.SUCCESS, data: res.data.data }))
    .catch(error => dispatch({ type: FETCH_FEED.FAILURE, error }))
}
```

**Good**
```js
export const fetchFeedRequest = () => ({ type: FETCH_FEED.REQUEST })
export const fetchFeedSuccess = (data) => ({ type: FETCH_FEED.SUCCESS, data })
export const fetchFeedFailure = (error) => ({ type: FETCH_FEED.FAILURE, error })
export const fetchFeed = () => (dispatch, getState) => {
  dispatch(fetchFeedRequest())
  return axios({
    method: 'GET',
    url: API_ENDPOINT_GET_FEED(),
    headers: {
      Authentication: token
    }
  })
    .then(res => dispatch(fetchFeedSuccess(res.data.data)))
    .catch(error => dispatch(fetchFeedFailure(error)))
}
```

[< Back](../README.md)