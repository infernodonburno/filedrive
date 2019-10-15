import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './containers/Home'
import NavBar from './components/Navbar'
const App = props => (
  <div>
    <NavBar />
    <Route path='/' component={Header} />
    <Route path='/' component={Home} />
  </div>
)

export default App
