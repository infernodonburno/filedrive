import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { Security, ImplicitCallback } from '@okta/okta-react'

import Login from './containers/Login'

const config = {
  issuer: 'https://dev-205073.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa1mu5174DYuLHjM357',
  pkce: true
}

function App () {
  return (
    <div>
      <Security {...config}>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/implicit/callback' component={ImplicitCallback} />
      </Security>
    </div>
  )
}

export default App
