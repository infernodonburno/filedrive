import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './containers/Home'
import NavBar from './components/Navbar'
import Trash from './containers/Trash'
import View from './containers/View'

const App = props => (
  <div>
    <NavBar />
    <Route path='/' component={Header} />
    <Route exact path='/' component={Home} />
    <Route path='/trash/' component={Trash} />
    <Route path='/view' exact component={View} />
  </div>
)

export default App
