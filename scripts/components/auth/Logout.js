import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { notice } = this.state
    const { user } = this.props

    return (
      <div>
        <a href="#" onClick={this.handleLogout}>Logout</a>
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