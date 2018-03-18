# Class Selector - การเขียนตัวจัดการกรองข้อมูล Data

[< Back](../README.md)

**ตัวอย่างการเขียนตัวจัดการกรองข้อมูล Data**
```js
// productSelector.js
import { get } from 'lodash'

class Product {
  // ข้อมูลเริ่มต้น เมื่อไม่สามารถหาค่าได้
  static defaultProps = {
    isFetching: false,
    isReload: false,
    error: '',
    data: {},
  }

  // Get Product By ID
  static getByID(state, key) {
    return get(state.product.keys, key, this.defaultProps)
  }

  // Get Data Product By ID
  static getDataByID(state, key) {
    return this.getByID(state, key).data
  }
}

export default Product
```

**Usage**
```js
// productConnector.js
import { connect } from 'react-redux'
import Product from './productSelector'

export const withGitHub = connect(
  // mapStateToProps
  (state, ownProps) => ({
    data: Product.getByID(state, ownProps.id).data,
  })
)
```

[< Back](../README.md)