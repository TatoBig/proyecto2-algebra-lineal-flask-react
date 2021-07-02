import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField, Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  input: {
    width: 100,
    margin: theme.spacing(2)
  }
}))

export default function FormInput(props) {
  const classes = useStyles()
  const {
    control,
    error,
    fullWidth,
    label,
    name
  } = props
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          className={classes.input}
          error={error !== undefined}
          fullWidth={fullWidth}
          helperText={error && error.message}
          label={label}
          margin="normal"
          autoComplete="new-password"
          variant="outlined"
          {...field}
        />
      )}
    />
  )
}
