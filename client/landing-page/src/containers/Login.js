import React from 'react';
import '../App.css'
import SimpleCard from '../components/login_page/LoginForm'
import HeaderAppBar from '../components/GlobalHeader'

function Login() {
    return (
      <div className="App">
        <header className="App-header">
          <HeaderAppBar />
          <SimpleCard />
        </header>
      </div>
    );
  }
  
  export default Login;