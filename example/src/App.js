import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { firestore } from '../../src'
import DevTools from 'mobx-react-devtools'


@firestore('store', {
  key: 'subscriptions',
  ref: root => root.child('subscriptions')
}, {
  key: 'orders',
  ref: root => root.child('orders')
})
@observer
class App extends Component {
  render() {
    const { profile, name, subscriptions } = this.props.store
    return (
      <div>
        <div>
          Name: {name.get('.updating') ? 'Updating ...' : name.get('.value')}
        </div>
        <div>
          Username: {profile.get('username')}
        </div>
        <ul>{
            subscriptions.map(item => {
              const key = item.get('.key')
              return (
                <li key={key}>{key}: {item.get('frequency')}</li>
              )
            })
          }
        </ul>
        <DevTools />
      </div>
    )
  }
}

export default App
