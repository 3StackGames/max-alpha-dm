import { combineReducers } from 'redux'
import user from './user'
import deck from './deck'

export default combineReducers({
  user,
  deck
})
