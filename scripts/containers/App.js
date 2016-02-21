import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActs from '../ducks/user'
import { auth } from '../components'

@connect((state) => ({
  user: state.user
}))
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.userActs = bindActionCreators(userActs, props.dispatch)

    let login = localStorage.getItem('login')

    if(login) {
      try {
        login = JSON.parse(login)
        this.userActs.authLogin(login)
      } catch(e) {
        console.log('auth invalid json')
        localStorage.removeItem('login')
      }
    }
  }
  render() {
    const { Logout } = auth
    const props = {
      ...this.props,
      userActs: this.userActs
    }
    let logout = null

    if(this.props.user.active) {
      logout = <Logout {...props} />
    }
    return (
      <div>
        {logout}
        {this.props.children}
      </div>
    )
  }
}