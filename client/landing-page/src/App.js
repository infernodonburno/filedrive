import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from '@material-ui/core'
import SimpleCard from './components/login_page/LoginForm'
import HeaderAppBar from './components/GlobalHeader'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderAppBar />
        <SimpleCard />
      </header>
    </div>
  );
}

export default App;
