# Base Style - การเขียน StyleSheet ในรูปแบบ Class

**ตัวอย่างการเขียน StyleSheet ในรูปแบบ Class**
```js
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
```

[< Back](../README.md)