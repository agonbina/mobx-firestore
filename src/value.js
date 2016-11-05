import mobx, { action, ObservableMap } from 'mobx'
import { isObject } from 'lodash'

global.mobx = mobx

class Value extends ObservableMap {

  static defaults = {
    '.exists': false,
    '.error': false,
    '.updating': false,
    '.removing': false,
    '.loading': false
  }

  constructor (ref, defaults = {}) {
    super(Value.defaults)
    Object.defineProperty(this, 'ref', {
      value: ref,
      enumerable: true,
      writable: false
    })
  }

  @action setValue (snap) {
    const defaults = {
      '.exists': snap.exists(),
      '.loading': false
    }
    let value = snap.val()
    if (!isObject(value)) {
      value = {
        '.value': value
      }
    }
    this.merge(Object.assign({}, value, defaults))
  }

  @action bind () {
    if (this.subscription) {
      return
    }
    this.set('.loading', true)
    this.subscription = this.ref.on('value', snap => {
      this.setValue(snap)
    }, error => {
      this.set('.error', true)
    })
  }

  @action update (value) {
    let promise
    this.set('.updating', true)
    if (isObject(value)) {
      promise = this.ref.set(value)
    } else {
      promise = this.ref.update(value)
    }
    return promise.then(() => {
      this.set('.updating', false)
      return Promise.resolve()
    })
  }

  @action remove () {
    this.set('.removing', true)
    return this.ref.remove().then(() => {
      this.set('.removing', false)
      this.unbind()
      return Promise.resolve()
    })
  }

  @action transaction () {
    // TODO: implement
  }

  unbind () {
    this.ref.off('value', this.subscription)
    delete this.subscription
  }

}

export default Value
