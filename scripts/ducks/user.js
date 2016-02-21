const AUTH_LOGIN = 'max-alpha-dm/user/AUTH_LOGIN'
const AUTH_LOGOUT = 'max-alpha-dm/user/AUTH_LOGOUT'
const SET_USERNAME = 'max-alpha-dm/user/SET_USERNAME'
const SET_DECKS = 'max-alpha-dm/deck/SET_DECKS'
const ADD_DECK = 'max-alpha-dm/deck/ADD_DECK'

const initialState = {
  active: false,
  username: '',
  decks: [],
  cards: []
}
const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case AUTH_LOGIN:
      return payload
    case AUTH_LOGOUT:
      return initialState
    case SET_USERNAME:
      return {
        ...state,
        username: payload
      }
    case SET_DECKS:
      return {
        ...state,
        decks: payload
      }
    case ADD_DECK:
      return {
        ...state,
        decks: state.decks.concat(payload)
      }
    default:
      return state
  }
}

export const authLogin = (user) => {
  return {
    type: AUTH_LOGIN,
    payload: user
  }
}

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  }
}

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username
  }
}

export const setDecks = (decks) => {
  return {
    type: SET_DECKS,
    payload: decks
  }
}

export default reducer