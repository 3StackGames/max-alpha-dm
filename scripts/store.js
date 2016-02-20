import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from './ducks/reducer'

const logger = createLogger()
const configureStore = applyMiddleware(logger)(createStore)

export default configureStore(rootReducer)