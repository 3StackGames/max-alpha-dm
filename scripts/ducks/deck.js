const SET_DECK = 'max-alpha-dm/deck/SET_DECK'
const ADD_DECK = 'max-alpha-dm/deck/ADD_DECK'

const initialState = {}
const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_DECK:
      return payload
    case ADD_DECK:
      return {
        ...state,
        payload
      }
    default:
      return state
  }
}