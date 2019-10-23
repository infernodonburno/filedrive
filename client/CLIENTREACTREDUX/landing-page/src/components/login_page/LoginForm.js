import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import OktaSignInWidget from '../OktaSignInWidget'
const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

const paperStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(20, 20)
  }
}))

export default function SimpleCard () {
  const classes = useStyles()
  const paperClasses = paperStyles()

  return (
    <Paper className={paperClasses.root} />
        
   
  )
}
