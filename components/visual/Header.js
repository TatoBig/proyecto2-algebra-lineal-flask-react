import React from 'react'
import { Grid, Button, Divider, Typography, Box, IconButton, makeStyles } from '@material-ui/core/'
import { ArrowBack } from '@material-ui/icons/'

const useStyles = makeStyles(theme => ({
  title: {
    padding: 7
  }
}))

const Header = (props) => {
  const { title, returnMenu } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="row">
        <Box>
          <IconButton aria-label="delete" onClick={() => returnMenu()}>
            <ArrowBack />
          </IconButton>
        </Box>
        <Box className={classes.title}>
          <Typography variant="h5" color="initial">
            {title}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </React.Fragment>
  )
}

export default Header
