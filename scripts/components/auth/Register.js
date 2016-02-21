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
        <ul className="notice">{notice}</ul>
        Username: <input type="text" name="username" onChange={this.handleInput} /><br />
        Password: <input type="password" name="password" onChange={this.handleInput} /><br />
        Verify Password: <input type="password" name="repassword" onChange={this.handleInput} /><br />
        <input type="submit" onClick={this.handlePlayerRegister} />
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

    const onResponse = (res) => {
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
    }

    const api = new APICall('/users', 'POST')
    api.run(this.state.form, onResponse)
  }
}