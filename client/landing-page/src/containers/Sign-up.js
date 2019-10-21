import React from 'react';
import '../App.css'
import SimpleCard from '../components/setup_page/SetupForm'
import HeaderAppBar from '../components/GlobalHeader'

function SignUp() {
    return (
      <div className="App">
        <header className="App-header">
          <HeaderAppBar />
          <SimpleCard />
        </header>
      </div>
    );
  }
  
  export default SignUp;