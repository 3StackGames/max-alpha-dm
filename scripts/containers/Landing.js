import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActs from '../ducks/user'
import autobind from 'autobind-decorator'
import { auth } from '../components'
import { browserHistory } from 'react-router'

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

  componentWillMount() {
    this.checkIfLogged(this.props)
  }

  componentWillUpdate(nextProps, nextState) {
    this.checkIfLogged(nextProps)
  }

  render() {
    const { toggleAuth } = this.state
    const { Login, Register } = auth

    if(!toggleAuth) {
      return this.displayAuthComponent(Register, `Already have an account? Login!`)
    }

    return this.displayAuthComponent(Login, `Don't have an account? Register!`)
  }

  displayAuthComponent(AuthComponent, text) {
    const props = {
      ...this.props,
      userActs: this.userActs,
      toggleAuth: this.toggleAuth
    }

    return (
      <div>
        <AuthComponent {...props} />
        <a href="#" onClick={this.toggleAuth}>{text}</a>
      </div>
    )
  }

  checkIfLogged(props) {
    if(props.user.active) {
      browserHistory.push('/deck')
    }
  }

  @autobind
  toggleAuth(e = null) {
    if(e) {
      e.preventDefault()
    }

    const state = this.state

    this.setState({
      ...state,
      toggleAuth: !state.toggleAuth
    })
  }
}