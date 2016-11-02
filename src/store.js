import Value from './value'
import List from './list'
import { isFunction, forOwn } from 'lodash'

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
  * Bind a remote Firebase reference as a mobx Map.
  * @param {string} key the attribute name to bind the Value instance to
  * @param {FirebaseReference|Function} ref a reference or a function that returns a reference
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
   * Bind a remote Firebase reference as a mobx Array.
   * @param  {string} key the attribute name to bind the List instance to
   * @param  {FirebaseReference|Function} ref a reference or a function that returns a reference
   * @return {List}
   */

  bindArray (key, ref) {
    const keyRef = getRef(this.root, ref)
    const list = new List(keyRef)
    this[key] = list
    list.bind()
    return list
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

function getRef (root, ref) {
  if (isFunction(ref)) {
    return ref(root)
  } else {
    return ref
  }
}

export default FirebaseStore
