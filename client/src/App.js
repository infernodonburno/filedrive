import React from 'react'
import { Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './containers/Home'
import NavBar from './components/Navbar'
import Trash from './containers/Trash'
import Folder from './containers/Folder'
import SidebarExample from './components/Breadcrumb'

const App = props => (
  <div>
    <NavBar />
    <SidebarExample />
    <Route path='/' component={Header} />
    <Route exact path='/' component={Home} />
    <Route exact path='/trash' component={Trash} />
    <Route path='/folders/:id' exact component={Folder} />
  </div>
)

export default App
