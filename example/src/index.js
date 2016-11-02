import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import { FirebaseStore } from '../../src'

const ref = firebase.database().ref()
const store = new FirebaseStore(ref)

global.profile = store.bindValue('profile', ref.child('profile'))
global.name = store.bindValue('name', ref.child('name'))
global.subscriptions = store.bindArray('subscriptions', ref.child('subscriptions'))
global.store = store

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    render(
      <AppContainer>
        <NextApp store={store}/>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
