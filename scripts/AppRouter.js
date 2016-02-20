import React from 'react'
import { Router, Route, Link, IndexRoute, Redirect, browserHistory } from 'react-router'
import {
  App,
  Landing
} from './containers'

const AppRouter = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Landing} />
    </Route>
  </Router>
)

export default AppRouter