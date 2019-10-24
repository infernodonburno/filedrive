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
      <Route path='/' exact component={Login} />
      <Route path='/login' exact component={Login} />
      <Route path='/implicit/callback' component={ImplicitCallback} />
    </Security>
    <NavBar />
    <SidebarExample />
    <Route path='/' component={Header} />
    <Route exact path='/' component={Home} />
    <Route exact path='/trash' component={Trash} />
    <Route path='/folders/:id' exact component={Folder} />
  </div>
)

export default App
