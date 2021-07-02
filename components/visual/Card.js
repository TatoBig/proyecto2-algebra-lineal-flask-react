import { Paper, Typography, makeStyles, Box, Divider } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    backgroundColor: '#FEFEFE'
  },
  header: {
    margin: theme.spacing(0),
    padding: theme.spacing(3, 4)
  },
  children: {
    marginTop: theme.spacing(4)
  }
}))

const Card = (props) => {
  const { children, title } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <Paper elevation={3} className={classes.paper}>
        <section className={classes.header}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h4">
              {title}
            </Typography>
          </Box>
          <Divider />
          <div className={classes.children}>
            {children}
          </div>
        </section>
      </Paper>
    </React.Fragment>
  )
}

export default Card
