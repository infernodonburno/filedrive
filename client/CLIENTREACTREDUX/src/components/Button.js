import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}))

const Buttond = props => {
  const classes = useStyles()
  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button}
              onClick={props.onClick}>{props.text}</Button>
    </div>
  )
}

export default Buttond
