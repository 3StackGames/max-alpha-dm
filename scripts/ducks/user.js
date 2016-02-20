const AUTH_LOGIN = 'max-alpha-dm/user/AUTH_LOGIN'
const SET_USERNAME = 'max-alpha-dm/user/SET_USERNAME'
const SET_DECK = 'max-alpha-dm/deck/SET_DECK'
const ADD_DECK = 'max-alpha-dm/deck/ADD_DECK'
const REMOVE_DECK = 'max-alpha-dm/deck/REMOVE_DECK'

const initialState = {
  active: false,
  username: '',
  deck: []
}
const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case AUTH_LOGIN:
      return payload
    case SET_USERNAME:
      return {
        ...state,
        username: payload
      }
    case SET_DECK:
      return {
        ...state,
        deck: payload
      }
    case ADD_DECK:
      return {
        ...state,
        deck: state.deck.concat(payload)
      }
    case REMOVE_DECK:
      return {
        ...state,
        deck: state.deck.slice[0, payload].concat(state.deck.slice[payload])
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

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username
  }
}

export default reducer