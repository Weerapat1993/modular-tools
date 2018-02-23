# Folder Structure

[< Back](../README.md)

## Table of Contents
* [Common](#common)
* [Features](#features)
* [Scenes](#scenes)
* [Utils](#utils)

### Common

**Rules**

* Use only `React Component Class`
* Must be called more than one.
* This component is `Global`

**Folder Structure**
```t
common
├── ErrorCase
│   ├── ErrorCase.js
│   └── index.js
├── HandleCase
│   ├── HandleCase.js
│   └── index.js
└── index.js
```

### Features

**Rules**

* Use only `React Container Class`
* Must be called connent with `redux`
* When this file is `React Component Class` And Use only once.

**Folder Structure**
```t
features
├── product
│   ├── detail
│   │   ├── components
│   │   │   ├── ProductDetailContainer.js
│   │   │   ├── ProductDetailDescription.js
│   │   │   ├── styles.js
│   │   │   └── index.js
│   │   ├── redux
│   │   │   ├── index.js
│   │   │   ├── productDetailActionTypes.js
│   │   │   ├── productDetailActions.js
│   │   │   ├── productDetailEndpoints.js
│   │   │   ├── productDetailConnector.js
│   │   │   ├── productDetailReducer.js
│   │   │   ├── productDetailSelector.js
│   │   │   └── productDetailUtils.js
│   │   └── index.js
│   └── index.js
└── index.js
```

### Scenes

**Rules**

* Use only `React Component Class`
* Must be called with `react-router-flux`
* This components is `Scene`
* Set scene according to web path url

**Folder Structure**
```t
common
├── home
│   ├── HomeScene.js
│   └── index.js
├── about
│   ├── AboutScene.js
│   └── index.js
└── index.js
```
**Routes**
```js
import React from 'react'
import { Scene } from 'react-native-router-flux'

const Rotues = () => (
  <Scene key='inital' component={InitalScene} inital={true} />
  <Scene key='productDetail' component={ProductDetailScene} />
  <Scene key='productList' component={ProductListScene} />
  <Scene key='shop' component={ShopScene} />
)
```

### Utils

**Rules**

* Use only `Function` or `Class`
* Must be called more than one.
* This function is `Global`

**Folder Structure**
```t
utils
├── async-action
│   ├── asyncAction.js
│   ├── asyncActionTypes.js
│   └── index.js
├── reducer
│   ├── NormalizeReducer.js
│   ├── Reducer.js
│   └── index.js
├── store
│   ├── index.js
│   └── store.js
└── index.js
```

[Back to Top](#table-of-contents)