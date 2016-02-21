import React from 'react'
import { Router, Route, Link, IndexRoute, Redirect, browserHistory } from 'react-router'
import {
  App,
  Landing,
  DeckManage
} from './containers'

const AppRouter = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/deck(/:deckId)' component={DeckManage} />
      <IndexRoute component={Landing} />
    </Route>
  </Router>
)

export default AppRouter