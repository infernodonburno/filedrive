import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './containers/Home'
import NavBar from './components/Navbar'
import Trash from './containers/Trash'
import Folder from './containers/Folder'
import SidebarExample from './components/Breadcrumb'

import './App.css'
import { Security, ImplicitCallback } from '@okta/okta-react'

import Login from './containers/Login'

const config = {
  issuer: 'https://dev-205073.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa1mu5174DYuLHjM357',
  pkce: true
}
const App = props => (
  <div>
    <Security {...config}>
      <Route exact path='/' exact component={Login} />
      <Route exact path='/login' exact component={Login} />
      <Route exact path='/implicit/callback' component={ImplicitCallback} />
      <Route exact path='/home' exact component={Home} />
      <Route exact path='/trash' exact component={Trash} />
      <Route exact path='/folders/:id' exact component={Folder} />
    </Security>
    {/* <SidebarExample /> */}
  </div>
)

export default App
