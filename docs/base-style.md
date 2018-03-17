# Base Style - การเขียน StyleSheet ในรูปแบบ Class
- แนะนำให้ใช้คู่กับ React Native

**ตัวอย่างการเขียน StyleSheet ในรูปแบบ Class**
```js
// ./sty;es.js
import { BaseStyle } from '../utils'

class Style extends BaseStyle {
  size = value => ({
    width: value,
    height: value,
  })

  avatarCircle = (value) => ({
    ...this.size(value),
    borderRadius: value / 2
  })
}

export default new Style()
```

**Usage**
```js
// ProductContainer.js
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

class ProductContainer extends Component {
  render() {
    return (
      <View slyle={styles.flex(1)}>
        <Image source={'...'} style={styles.avatarCircle(60)} />
      </View>
    )
  }
}
```

[< Back](../README.md)