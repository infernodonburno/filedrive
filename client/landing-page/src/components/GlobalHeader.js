import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Link } from 'react-router-dom'

const HeaderAppBar = props => {
    return (
    <AppBar>
       <Link to='/' style={{ textDecoration: 'none', color: 'white',  }}>
       FileDrive 
       </Link>
    </AppBar>
    )
}

export default HeaderAppBar