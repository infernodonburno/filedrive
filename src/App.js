import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './containers/Home'
import View from './containers/View'
import NavBar from './components/Navbar'
const App = props => (
  <div>
    <NavBar />
    <Route path='/' component={Header} />
    <Route path='/' exact component={Home} />
    <Route path='/view' exact component={View} />
  </div>
)

export default App
