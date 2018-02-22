# Component

[< Back](../README.md)

## Table of Contents
* [PropTypes](#1-proptypes)
* [Constructor](#2-constructor)
* [Bind This](#3-bind-this)

### 1. PropTypes

**Bad**

* `No PropTypes`

**Good**
```js
class Example extends Component {
  static propTypes = {
    string: PropTypes.string,
    num: PropTypes.number,
    bool: PropType.bool,
    func: PropTypes.func.isRequired,
    obj: PropTypes.shape({
      data: PropTypes.array,
      isFetching: PropTypes.bool,
      isReload: PropTypes.bool,
      error: PropTypes.string,
    }),
    array: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    ...
  }
}
```

### 2. Constructor

**Bad**
```js
class Example extends Component {
  state = {
    ...
  }
}
```

**Good**
```js
class Example extends Component {
  constructor() {
    super()
    this.state = {
      ...
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
}
```

### 3. Bind This

**Bad**
```js
class Example extends Component {
  handleSubmit(e) {
    ...
  }

  render() {
    return (
      <Button title='Button' onPress={this.handleSubmit.bind(this)} />
    )
  }
}
```


**Good**
```js
class Example extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    ...
  }

  render() {
    return (
      <Button title='Button' onPress={this.handleSubmit} />
    )
  }
}
```

[Back to Top](#table-of-contents)