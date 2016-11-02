import Value from './value'

/**
 * A mobx store able to bind to Firebase references
 * @example
 * const store = new FirebaseStore(firebase.database().ref())
 */

class FirebaseStore {

  subscriptions = {}

  /**
   * Create a store instance.
   * @param {FirebaseReference} rootRef a Firebase reference
   */

  constructor (rootRef) {
    this.root = rootRef
  }

  /**
  * Bind a remote Firebase reference.
  * @param {string} key -
  * @param {FirebaseReference|Function} getRef a reference or a function that returns a reference
  * @returns {Value} an observable instance of Value
  */

  bindValue (key, getRef) {
    let ref
    if (isFunction(getRef)) {
      ref = getRef(this.root)
    } else {
      ref = getRef
    }
    this[key] = new Value(ref)
    return this[key]
  }

  bindArray () {

  }

  unbind () {

  }

  destroy () {

  }

}

export default FirebaseStore
