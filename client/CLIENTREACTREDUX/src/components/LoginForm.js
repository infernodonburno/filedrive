import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const paperStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(20, 20)
  }
}))

export default function SimpleCard () {
  const paperClasses = paperStyles()

  return <Paper className={paperClasses.root} />
}
