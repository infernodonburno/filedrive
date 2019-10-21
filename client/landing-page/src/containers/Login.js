import '../App.css'
import SimpleCard from '../components/login_page/LoginForm'
import HeaderAppBar from '../components/GlobalHeader'

import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'

export default withAuth(
  class Login extends Component {
    constructor (props) {
      super(props)
      this.state = { authenticated: null }
      this.checkAuthentication = this.checkAuthentication.bind(this)
      this.checkAuthentication()
      this.login = this.login.bind(this)
      this.logout = this.logout.bind(this)
    }

    async checkAuthentication () {
      const authenticated = await this.props.auth.isAuthenticated()
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated })
      }
    }

    componentDidUpdate () {
      this.checkAuthentication()
    }

    async login () {
      // Redirect to '/' after login
      this.props.auth.login('/')
    }

    async logout () {
      // Redirect to '/' after logout
      this.props.auth.logout('/')
    }

    render () {
      if (this.state.authenticated === null) return null
      if (this.state.authenticated) {
        return (
          <div className='App'>
            <header className='App-header'>
              <HeaderAppBar />
              <h1>authenticated!!!!!!!!!!!</h1>
              <SimpleCard />
            </header>
          </div>
        )
      } else {
        return (
          <div className='App'>
            <header className='App-header'>
              <HeaderAppBar />
              <h1>Not Authenticated!!!</h1>
              <SimpleCard />
            </header>
          </div>
        )
      }
      // this.state.authenticated ?
      //   <button onClick={this.logout}>Logout</button> :
      //   <button onClick={this.login}>Login</button>;
    }
  }
)
