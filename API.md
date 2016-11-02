<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

# FirebaseStore

A mobx store able to bind to Firebase references

**Examples**

```javascript
const ref = firebase.database().ref()
const store = new FirebaseStore(ref)
```

## constructor

Create a store instance.

**Parameters**

-   `rootRef` **FirebaseReference** a Firebase reference

## bindValue

Bind a remote Firebase reference.

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** \-
-   `getRef` **(FirebaseReference | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** a reference or a function that returns a reference
-   `ref`  

Returns **Value** an observable instance of Value

## unbind

Remove listener from the firebase reference

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to remove the listener for
-   `removeLocal` **\[removeLocal](default false)** unset the value from the store

Returns **void** 

## destroy

Remove listeners from all firebase references attached to this FirebaseStore instance

Returns **void** 