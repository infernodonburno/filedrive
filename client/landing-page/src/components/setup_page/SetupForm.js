import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

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
    <Paper className={paperClasses.root}>
      <Card className={classes.card}>
        Sign Up
        <CardContent>
          <div>
            <img src='./logo.png' height='100vh' alt='filedrivelogo' />
          </div>
          <form>
            <div>
              Username: <input type='text' />
            </div>
            <div>
              Password: <input type='text' />
            </div>
            <div>
              Re-Password: <input type='text' />
            </div>
            <div>
              First Name: <input type='text' />
            </div>
            <div>
              Last Name: <input type='text' />
            </div>
            <div>
              Email: <input type='text' />
            </div>
            <div>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                className={classes.submit}
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Paper>
  )
}
