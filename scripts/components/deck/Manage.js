import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { APICall } from '../../libs'
import { browserHistory } from 'react-router'

export default class Manage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notice: '',
      form: {
        token: props.user.token,
        name: '',
        mainCards: [],
        structures: []
      }
    }

    if(props.user.active) {
      const apiGetDeckInfop = new APICall(`/decks?userId=${props.user.id}&deckId=${props.params.deckId}`)
      apiGetDeckInfop.run(null, (res) => {
        const { form } = this.state

        this.setState({
          ...this.state,
          form: {
            ...form,
            ...res.data[0]
          }
        })
      })
    }
  }

  render() {
    const { notice, form } = this.state
    const cards = this.props.user.cards || []
    const addedCards = form.mainCards || []
    var counts = {};

    for(var i = 0; i< addedCards.length; i++) {
        var num = addedCards[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    return (
      <form>
        <h2>Modify deck</h2>
        <ul className="notice">{notice}</ul>
        Deck name: <input type="text" name="name" onChange={this.handleInput} value={form.name} />
        <ul>
        {cards.length == 0 ? <li>You currently have 0 cards</li> : null}
        {cards.map((card, k) => {
          return (
            <li key={k}>
              <a href="#" data-id={card.id} onClick={this.handleAddCard}>ADD</a>
              {' | '}
              <a href="#" data-id={card.id} onClick={this.handleRemoveCard}>REMOVE</a>
              {' | '}
              {card.name} &mdash;
              {' ' + (counts[card.id] || 0)}
            </li>
          )
        })}
        </ul>
        <input type="submit" onClick={this.handleCreateDeck}/>
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
  handleAddCard(e) {
    e.preventDefault()
    const cardId = e.target.getAttribute('data-id')
    const { form } = this.state

    this.setState({
      ...this.state,
      form: {
        ...form,
        mainCards: form.mainCards.concat(cardId)
      }
    })
  }

  @autobind
  handleRemoveCard(e) {
    e.preventDefault()
    const cardId = e.target.getAttribute('data-id')
    const { form } = this.state
    const { mainCards: cards } = form
    const firstFound = cards.indexOf(cardId)

    if(firstFound < 0) {
      return
    }

    this.setState({
      ...this.state,
      form: {
        ...form,
        mainCards: cards.slice(0, firstFound).concat(cards.slice(firstFound + 1))
      }
    })
  }

  @autobind
  handleCreateDeck(e) {
    e.preventDefault()
    const { form } = this.state
    const { name } = form

    if(name.length < 1) {
      this.setState({
        ...this.state,
        notice: <li>Invalid Properties: Missing name</li>
      })
    }

    const api = new APICall('/decks', 'PUT')
    api.run(form, (res) => {
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

      browserHistory.push('/deck')
    })
  }
}