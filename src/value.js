import { action, ObservableMap } from 'mobx'
import isFunction from 'lodash/is-function'
import isObject from 'lodash/is-object'


class Value extends ObservableMap {

  constructor (ref) {
    super()
    this.ref = ref
    this.bind()
  }

  @action setValue (value) {
    if (isObject(value)) {
      this.merge(value)
    } else {
      this.set('.value', value)
    }
  }

  bind () {
    if (this.subscription) {
      return
    }
    this.subscription = this.ref.on('value', snap => {
      this.setValue(snap.val())
    })
  }

  unbind () {
    this.ref.off('value', this.subscription)
    delete this.subscription
  }

}

export default Value
