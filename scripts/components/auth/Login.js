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
        <ul className="notice">{notice}</ul>
        Username: <input type="text" name="username" onChange={this.handleInput} defaultValue={user.username} /><br />
        Password: <input type="password" name="password" onChange={this.handleInput} /><br />
        <input type="submit" onClick={this.handlePlayerLogin} />
      </form>
    )
  }

  @autobind
  handleInput(e) {
    const target = e.target
    const state = this.state
    this.setState({
      notice: state.notice,
      form: {
        ...state.form,
        [target.name]: target.value
      }
    })
  }

  @autobind
  handlePlayerLogin(e) {
    e.preventDefault()
    const { userActs } = this.props

    const onResponse = (res) => {

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
    }

    const api = new APICall('/authenticate/login', 'POST')
    api.run(this.state.form, onResponse)
  }
}