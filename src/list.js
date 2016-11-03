import { action, observable, asMap } from 'mobx'
import { isFunction, isObject } from 'lodash'

const ObservableArray = observable([]).constructor

class List extends ObservableArray {

  constructor (ref) {
    super()
    Object.defineProperty(this, 'ref', {
      value: ref,
      enumerable: true,
      writable: false
    })
  }

  bind () {
    if (this.subscriptions) {
      return
    }
    const { ref } = this

    if (this.length > 0) {
      this.clear()
    }

    const onAdd = ref.on('child_added', (snapshot, prevKey) => {
      const index = prevKey ? findIndexByKey(this, prevKey) + 1 : 0
      const record = createRecord(snapshot)
      this.splice(index, 0, asMap(record))
    })

    const onRemove = ref.on('child_removed', snapshot => {
      const item = findByKey(this, _getKey(snapshot))
      this.remove(item)
    })

    const onChange = ref.on('child_changed', snapshot => {
      const item = findByKey(this, _getKey(snapshot))
      item.merge(createRecord(snapshot))
    })

    const onMove = ref.on('child_moved', (snapshot, prevKey) => {
      const index = findIndexByKey(this, _getKey(snapshot))
      const record = this.splice(index, 1)[0]
      const newIndex = prevKey ? findIndexByKey(this, prevKey) + 1 : 0
      this.splice(newIndex, 0, record)
    })

    this.subscriptions = {
      child_added: onAdd,
      child_removed: onRemove,
      child_changed: onChange,
      child_moved: onMove
    }
  }

  unbind () {
    const { subscriptions } = this
    for (var event in subscriptions) {
      this.ref.off(event, subscriptions[event])
    }
    delete this.subscriptions
  }

}

function _getKey (snapshot) {
  return typeof snapshot.key === 'function'
    ? snapshot.key()
    : snapshot.key
}

function createRecord (snapshot) {
  var value = snapshot.val()
  value['.key'] = _getKey(snapshot)
  return value
}

function findIndexByKey (list, key) {
  return list.findIndex(item => item.get('.key') === key)
}

function findByKey (list, key) {
  return list.find(item => item.get('.key') === key)
}

export default List
