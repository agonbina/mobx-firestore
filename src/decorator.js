import React from 'react'
import { inject } from 'mobx-react'

/**
 * A decorator to inject a FirebaseStore to your component and manage store
 * subscriptions(bindings) automatically
 * @param  {string} storeName the name of the FirebaseStore instance to inject
 * @param  {...Array[Object]} subscriptions
 * @return {FireComponent} a hoc React.Component
 */
const firestore = (storeName, ...subscriptions) =>
  Component => {

    @inject(storeName)
    class FireComponent extends React.Component {

      constructor (props) {
        super(props)
      }

      get store () {
        return this.props[storeName]
      }

      componentWillMount () {
        subscriptions.forEach(subscription => {
          const { key, ref } = subscription
          this.store.bindArray(key, ref)
        })
      }

      componentWillUnmount () {
        subscriptions.forEach(({ key }) => this.store.unbind(key))
      }

      render () {
        return <Component {...this.props} store={this.store} />
      }
    }
    return FireComponent
  }

export default firestore
