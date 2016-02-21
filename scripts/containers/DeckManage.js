import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActs from '../ducks/user'
import autobind from 'autobind-decorator'
import { auth, deck } from '../components'
import { Link } from 'react-router'
import { bindAuth } from '../libs'

@connect((state) => ({
  user: state.user
}))
@bindAuth
export default class DeckManage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleAuth: true
    }

    this.userActs = bindActionCreators(userActs, props.dispatch)
  }

  render() {
    const { params } = this.props
    const deckId = params.deckId
    const { Show, Create, Manage } = deck
    const props = {
      ...this.props,
      userActs: this.userActs
    }

    if(deckId == undefined) {
      return (
        <div>
          <Link to="/deck/create">Create a new deck</Link>
          <Show {...props} />
        </div>
      )
    } else if(deckId == 'create') {
      return (
        <div>
          <Create {...props} />
        </div>
      )
    }

    return <Manage {...props} />
  }
}