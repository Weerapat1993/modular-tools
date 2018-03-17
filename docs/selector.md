# Class Selector - การเขียนตัวจัดการกรองข้อมูล Data

**ตัวอย่างการเขียนตัวจัดการกรองข้อมูล Data**
```js
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
  static get(state, key) {
    return get(state, `product.keys.${key}`, this.defaultProps)
  }

  // Get Data Product By ID
  static getData(state, key) {
    return this.get(state, key).data
  }
}

export default Product
```

[< Back](../README.md)