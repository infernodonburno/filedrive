import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
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
        File Drive
        <CardContent>
          <div>
            <img src='./logo.png' height='75vh' alt='filedrivelogo' />
          </div>
          <form>
            <div>
              <input type='text' placeholder='username' style={{textAlign: 'center'}} />
            </div>
            <div>
              <input type='text' placeholder='password' style={{textAlign: 'center'}} />
            </div>
            <div>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                className={classes.submit}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardActions>
          <Button
            href='/signup'
            style={{ display: 'flex', textAlign: 'right' }}
            type='submit'
            variant='text'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </Paper>
  )
}
