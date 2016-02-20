import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { API_URL } from '../../../.env'

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
    );
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

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        const res = JSON.parse(xhr.responseText)

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

        userActs.authLogin(res.data)
      }
    }
    xhr.open('POST', `${API_URL}/authenticate/login`)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.send(JSON.stringify(this.state.form))
  }
}