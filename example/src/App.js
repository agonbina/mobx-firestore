import React, { Component } from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

@observer
class App extends Component {
  render() {
    const { profile, name } = this.props.store
    return (
      <div>
        <div>
          Name: {name.get('.updating') ? 'Updating ...' : name.get('.value')}
        </div>
        <div>
          Username: {profile.get('username')}
        </div>
        <DevTools />
      </div>
    )
  }
}

export default App
