import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Typography, makeStyles, Box } from '@material-ui/core/'

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 150
    }
  },
})

const useStyles = makeStyles(theme => ({
  leftKey: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(-2)
  },
  rightKey: rows => ({
    marginTop: theme.spacing(-2),
    marginRight: theme.spacing(2)
  }),
  matrixTitle: {
    marginLeft: theme.spacing(9),
    marginTop: theme.spacing(2)
  },
  matrixRows: columns => ({
    width: 140 * columns
  })
}))

const MatrixKeys = (props) => {
  const { children, columns, rows, title } = props
  const classes = useStyles(columns)

  return (
    <React.Fragment>
      <Typography variant="h5" color="initial" className={classes.matrixTitle}>
        {title}
      </Typography>
      <Box display="flex">
        <ThemeProvider theme={theme}>
          <Typography variant="subtitle1" color="initial" className={classes.leftKey}>
            [
          </Typography>
          <Box className={classes.matrixRows}>
            {children}
          </Box>
          <Typography variant="subtitle1" color="initial" className={classes.rightKey}>
            ]
          </Typography>
        </ThemeProvider>
      </Box>
    </React.Fragment>
  )
}

export default MatrixKeys
