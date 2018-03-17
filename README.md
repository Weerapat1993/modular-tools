# Modular Tools

## Modular Standard Style Guide (Incomplete)

## Table of Contents
* [Folder Structure](./docs/folder-structure.md)
* [JSDoc - เขียน Comment อย่างไรให้อ่านแล้วเข้าใจง่าย](./docs/jsdoc.md)
* [Base Style - การเขียน StyleSheet ในรูปแบบ Class](./docs/base-style.md)
* [Constants - วิธีการประกาศตัวแปร](./docs/constants.md)
* [Class Component](./docs/component.md)
* [Class Container](./docs/container.md)
* [Action Creator](./docs/actions.md)
* [Class Reducer - การเขียน Reducer ในรูปแบบ Class](./docs/reducer.md)
* [Class Selector - การเขียนตัวจัดการกรองข้อมูล Data](./docs/selector.md)
* [Redux Connector - เขียน Scope แยกการทำงานโดยเขียนในรูปแบบ High Order Component](./docs/redux.md)
* [User Interface State ทุกแอปพลิเคชั่นควรมี](./docs/error-handling.md)

### How to use
```
git clone https://github.com/Weerapat1993/modular-tools.git
cd modular-tools
npm install -g
```

### Create File in Project
```sh
modular make:common [name] # Mobile only
modular make:component [name] # Web only
modular make:feature [name]
modular make:scene [name] # Mobile only
modular make:page [name] # Web only
modular make:util [name]
```

### Create New Project
```sh
modular init [name]
```

### Modular Config Project
```sh
modular config
```

### Add Modular Config
![Add Child Modular](./app/assets/images/add.gif)

### Remove Modular Config
![Add Child Modular](./app/assets/images/remove.gif)

### Commit Modular
- Copy File git diff in `/src` to `Parent Modular`

```sh
modular commit
```

![Copy File Child Modular](./app/assets/images/commit.gif)

### Clone Modular
- Copy Folder `/src` to `Parent Modular`

```sh
modular clone
```

![Copy Folder Child Modular](./app/assets/images/clone.gif)
