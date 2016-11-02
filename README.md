mobx-firestore
=====================
Easily attach Firebase reference bindings to mobx stores.

See `API.md` for documentation.

### Install
```
npm install --save mobx-firestore
```

### Usage
```js
import { FirebaseStore } from 'mobx-firestore'

const ref = firebase.database().ref()
const store = new FirebaseStore(ref)

store.bindValue('profile', ref.child('profile'))
```
