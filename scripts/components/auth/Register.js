import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { APICall } from '../../libs'

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notice: null,
      form: {
        username: '',
        password: '',
        repassword: ''
      }
    }
  }

  render() {
    const { notice } = this.state

    return (
      <form>
        <h2>Register</h2>
        <ul className={"notice" + (notice ? ' has-errors' : null)}>{notice}</ul>
        <div className="input-group">
          <label htmlFor="register-username">Username:</label>
          <input id="register-username" type="text" name="username" onChange={this.handleInput} />
        </div>
        <div className="input-group">
          <label htmlFor="register-password">Password:</label>
          <input id="register-password" type="password" name="password" onChange={this.handleInput} />
        </div>
        <div className="input-group">
          <label htmlFor="register-repassword">Verify Password:</label>
          <input id="register-repassword" type="password" name="repassword" onChange={this.handleInput} />
        </div>
        <input type="submit" onClick={this.handlePlayerRegister} />
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
  handlePlayerRegister(e) {
    e.preventDefault()
    const { userActs } = this.props
    const { username, password, repassword } = this.state.form 
    let error;

    if(!username || !password || !repassword) 
    {
      error = <li>Invalid Properties: Missing either username or password</li>
    } else if(repassword != password) {
      error = <li>Invalid Properties: Password not same as verify password</li>
    }

    if(error) {
      this.setState({
        ...this.state,
        notice: error
      })

      return
    }

    const api = new APICall('/users', 'POST')
    api.run(this.state.form, (res) => {
      let notice = null

      if(res.errors == undefined) {
        userActs.setUsername(username)
        this.props.toggleAuth()
        return
      }

      notice = res.errors.map((data, k) => {
        return <li key={k}>{data.title}: {data.detail}</li>
      })

      this.setState({
        ...this.state,
        notice
      })
    })
  }
}