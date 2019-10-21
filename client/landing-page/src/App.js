import React from 'react';
import { Route, Router } from 'react-router-dom'
import './App.css';

import SimpleCard from './components/login_page/LoginForm'
import HeaderAppBar from './components/GlobalHeader'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'

import Login from './containers/Login'
import SignUp from './containers/Sign-up'

function App () {
  return (
    <div>
      <Route path='/' exact component={Login} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={SignUp} />
    </div>
    
  );
}

export default App;
