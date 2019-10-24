import '../App.css'
import HeaderAppBar from '../components/GlobalHeader'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withAuth } from '@okta/okta-react'
import OktaSignInWidget from '../components/OktaSignInWidget'
import ContainedButtons from '../components/FileDriveButton'
import StyledCard from '../components/StyledCard'

export default withAuth(
  class Login extends Component {
    constructor (props) {
      super(props)
      this.state = { authenticated: null }
      this.checkAuthentication = this.checkAuthentication.bind(this)
      this.checkAuthentication()
      this.login = this.login.bind(this)
      this.logout = this.logout.bind(this)
      this.onSuccess = this.onSuccess.bind(this)
      this.onError = this.onError.bind(this)
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
      localStorage.clear()
    }

    onSuccess (res) {
      if (res.status === 'SUCCESS') {
        return this.props.auth.redirect({
          sessionToken: res.session.token
        })
      } else {
        // The user can be in another authentication state that requires further action.
        // For more information about these states, see:
        //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
        return this.props.auth.logout('/')
      }
    }

    onError (err) {
      console.log('error logging in', err)
    }

    render () {
      if (this.state.authenticated === null) return null
      if (this.state.authenticated) {
        return (
          <Redirect to='/home' />
        )
      } else {
        return (
          <div className='App'>
            <header className='App-header'>
              <HeaderAppBar />

              {/* <SimpleCard /> */}
              <OktaSignInWidget
                onSuccess={this.onSuccess}
                onError={this.onError}
              />
            </header>
          </div>
        )
      }
    }
  }
)
