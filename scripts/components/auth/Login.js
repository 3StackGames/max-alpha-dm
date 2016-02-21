import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { APICall } from '../../libs'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notice: null,
      form: {
        username: props.user.username || '',
        password: ''
      }
    }
  }

  render() {
    const { notice } = this.state
    const { user } = this.props

    return (
      <form>
        <h2>Login</h2>
        <ul className={"notice" + (notice ? ' has-errors' : null)}>{notice}</ul>
        <div className="input-group">
          <label htmlFor="login-username">Username:</label>
          <input id="login-username" type="text" name="username" onChange={this.handleInput} defaultValue={user.username} />
        </div>
        <div className="input-group">
          <label htmlFor="login-password">Password:</label>
          <input id="login-password" type="password" name="password" onChange={this.handleInput} />
        </div>
        <input type="submit" onClick={this.handlePlayerLogin} />
      </form>
    )
  }

  @autobind
  handleInput(e) {
    const target = e.target
    const { notice, form } = this.state
    this.setState({
      notice: notice,
      form: {
        ...form,
        [target.name]: target.value
      }
    })
  }

  @autobind
  handlePlayerLogin(e) {
    e.preventDefault()
    const { userActs } = this.props

    const api = new APICall('/authenticate/login', 'POST')
    api.run(this.state.form, (res) => {
      if(res.errors !== undefined) {
        const errors = res.errors.map((error, k) => {
          return <li key={k}>{error.title}: {error.detail}</li>
        })

        this.setState({
          ...this.state,
          notice: errors
        })

        return
      }

      localStorage.setItem('login', JSON.stringify(res.data))
      userActs.authLogin(res.data)
    })
  }
}