import React from 'react'
import { Button, makeStyles } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  option: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginRight: theme.spacing(2)
  },
  submit: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginRight: theme.spacing(2)
  }
}))

export const OptionButton = (props) => {
  const { text, onClick, fullWidth } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <Button className={classes.option} fullWidth={fullWidth} onClick={onClick}>
        {text}
      </Button>
    </React.Fragment>
  )
}

export const SubmitButton = (props) => {
  const { text, onClick, fullWidth } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <Button className={classes.submit} fullWidth={fullWidth} onClick={onClick}>
        {text}
      </Button>
    </React.Fragment>
  )
}
