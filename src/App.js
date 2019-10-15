import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'

const App = props => (
  <div>
    <Route path='/' component={Header} />
  </div>
)

export default App
