import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActs from '../ducks/user'
import autobind from 'autobind-decorator'
import { auth } from '../components'

@connect((state) => ({
	user: state.user
}))
export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleAuth: true
    }

    this.userActs = bindActionCreators(userActs, props.dispatch)
  }

  render() {
    const { user } = this.props
    const { toggleAuth } = this.state
    let comp = (
      <div></div>
    )

    if(user.active == false) {
      const { Login, Register } = auth
      if(toggleAuth || user.username.length != 0) {
        comp = (
          <div>
            <Login userActs={this.userActs} user={user} />
            <a href="#" onClick={this.toggleAuth}>Don't have an account? Register!</a>
          </div>
        )
      } else {
        comp = (
          <div>
            <Register userActs={this.userActs} />
            <a href="#" onClick={this.toggleAuth}>Already have an account? Login!</a>
          </div>
        )
      }
    }
    return comp
  }

  @autobind
  toggleAuth(e) {
    e.preventDefault()
    const state = this.state

    this.setState({
      ...state,
      toggleAuth: !state.toggleAuth
    })
  }
}