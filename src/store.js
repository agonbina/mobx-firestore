import Value from './value'
import { isFunction, forOwn } from 'lodash'

function getRef (root, ref) {
  if (isFunction(ref)) {
    return ref(root)
  } else {
    return ref
  }
}

/**
 * A mobx store able to bind to Firebase references
 * @example
 * const ref = firebase.database().ref()
 * const store = new FirebaseStore(ref)
 */

class FirebaseStore {

  /**
   * Create a store instance.
   * @param {FirebaseReference} rootRef a Firebase reference
   */

  constructor (rootRef) {
    Object.defineProperty(this, 'root', {
      value: rootRef,
      enumerable: false,
      writable: false
    })
  }

  /**
  * Bind a remote Firebase reference.
  * @param {string} key -
  * @param {FirebaseReference|Function} getRef a reference or a function that returns a reference
  * @returns {Value} an observable instance of Value
  */

  bindValue (key, ref) {
    const keyRef = getRef(this.root, ref)
    const value = new Value(keyRef)
    this[key] = value
    value.bind()
    return value
  }


  /**
   * Remove listener from the firebase reference
   * @param  {string} key to remove the listener for
   * @param {removeLocal} removeLocal unset the value from the store
   * @return {void}
   */

  unbind (key, removeLocal = false) {
    const binding = this[key]
    if (!binding) {
      return
    }
    binding.unbind()
  }


  /**
   * Remove listeners from all firebase references attached to this FirebaseStore instance
   * @return {void}
   */

  destroy () {
    forOwn(this, (value, key) => this[key].unbind())
  }

}

export default FirebaseStore
