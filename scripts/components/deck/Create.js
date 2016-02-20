import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { API_URL } from '../../../.env'

export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleAuth: true
    }

    this.userActs = bindActionCreators(userActs, props.dispatch)
  }

  render() {
    return (
      <form>
        Deck name: <input type="text"/>
        <input type="submit" onClick={this.handleCreateDeck}/>
      </form>
    )
  }

  @autobind
  handleCreateDeck(e) {
    e.preventDefault()
  }
}