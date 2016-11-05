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

Bind a remote Firebase reference as a mobx Map.

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the attribute name to bind the Value instance to
-   `ref` **(FirebaseReference | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** a reference or a function that returns a reference

Returns **Value** an observable instance of Value

## bindArray

Bind a remote Firebase reference as a mobx Array.

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the attribute name to bind the List instance to
-   `ref` **(FirebaseReference | [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** a reference or a function that returns a reference

Returns **List** 

## unbind

Remove listener from the firebase reference

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to remove the listener for
-   `removeLocal` **\[removeLocal](default false)** unset the value from the store

Returns **void** 

## destroy

Remove listeners from all firebase references attached to this FirebaseStore instance

Returns **void** 

# firestore

A decorator to inject a FirebaseStore to your component and manage store
subscriptions(bindings) automatically

**Parameters**

-   `storeName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the name of the FirebaseStore instance to inject
-   `subscriptions` **...Any** 

Returns **FireComponent** a hoc React.Component
