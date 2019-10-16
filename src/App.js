import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './containers/Home'
import Trash from './containers/Trash'

const App = props => (
  <div>
    <Route path='/' component={Header} />
    <Route exact path='/' component={Home} />
    <Route path='/trash/' component={Trash} />
  </div>
)

export default App
