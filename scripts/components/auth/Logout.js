import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="logout">
        <a href="#" onClick={this.handleLogout}>&laquo; Logout</a>
      </div>
    )
  }

  @autobind
  handleLogout(e) {
    e.preventDefault()
    this.props.userActs.authLogout()
    localStorage.removeItem('login')
  }
}