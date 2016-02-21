import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { APICall } from '../../libs'

export default class Show extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    if(props.user.active) {
      this.updateDeckList()
    }
  }

  render() {
    const { user } = this.props
    const decks = user.decks || []

    return (
      <div>
        <h2>Your decks</h2>
        <ul>
          {decks.map((deck, k) => {
            return <li key={k}>
              {deck.name} &mdash;
              {' '}
              <Link to={`/deck/${deck.id}`}>Edit</Link>
              {' '}
              <a href="#" data-id={deck.id} data-name={deck.name} onClick={this.handleDeckDelete}>Delete</a>
            </li>
          })}
        </ul>
      </div>
    )
  }

  updateDeckList() {
    const api = new APICall('/decks?userId='+this.props.user.id)
    api.run(null, (res) => {
      props.userActs.setDecks(res.data)
    })
  }

  @autobind
  handleDeckDelete(e) {
    e.preventDefault()
    const target = e.target
    const deckId = target.getAttribute('data-id')
    const deckName = target.getAttribute('data-name')

    const confirmDelete = confirm(`Are you sure you want to delete ${deckName}?`)

    if(confirmDelete) {
      const api = new APICall('/decks', 'DELETE')
      api.run({
        token: this.props.user.token,
        id: deckId
      }, (res) => {
        this.updateDeckList()
      })
    }
  }
}

