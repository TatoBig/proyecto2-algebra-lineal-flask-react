import React, { useState, useEffect, useRef } from 'react'
import { Grid, Button, Divider, Typography, Box, IconButton, makeStyles, Paper, Zoom, Slide } from '@material-ui/core/'
import { ArrowBack } from '@material-ui/icons/'
import Input from '../visual/Input'
import { useForm } from 'react-hook-form'
import { SubmitButton } from '../visual/Buttons'
import MatrixKeys from '../visual/MatrixKeys'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Header from '../visual/Header'
import ResultDialog from '../visual/ResultDialog'

const useStyles = makeStyles(theme => ({
  submit: {
    marginTop: theme.spacing(2)
  },
  paper: {
    width: 880,
    padding: theme.spacing(4)
  },
  result: {
    marginTop: theme.spacing(3)
  },
  row: {
    margin: theme.spacing(2)
  }
}))

const schema = yup.object().shape({
  c0: yup.string().required('Falta dato'),
  c1: yup.string().required('Falta dato'),
  c2: yup.string().required('Falta dato'),
  c3: yup.string().required('Falta dato'),
  c4: yup.string().required('Falta dato'),
  c5: yup.string().required('Falta dato'),
  c6: yup.string().required('Falta dato'),
  c7: yup.string().required('Falta dato')
})

const Opcion3 = (props) => {
  const { returnMenu, checked } = props
  const [open, setOpen] = useState(false)

  const [matriz2x4, setMatriz2x4] = useState([1, 2, 3, 4, 5, 6, 7, 8])
  const matriz2x2 = [1, 2, 3, 4]

  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const classes = useStyles()

  const onSubmit = (data) => {
    console.log(data)
    setOpen(true)
  }

  const getError = (index) => {
    switch (index) {
      case 0:
        return errors.c0
      case 1:
        return errors.c1
      case 2:
        return errors.c2
      case 3:
        return errors.c3
      case 4:
        return errors.c4
      case 5:
        return errors.c5
      case 6:
        return errors.c6
      case 7:
        return errors.c7
    }
  }

  /// 

  return (
    <React.Fragment>
      <Zoom in={checked} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.paper}>
          <Header
            returnMenu={returnMenu}
            title="Opcion 3"
          />
          <Grid container spacing={0}>
            <Box display="flex">
              <Grid item>
                <MatrixKeys columns={2} rows={3} title="Matriz A">
                  {
                    matriz2x4.map((cell, index) => (
                      <Input
                        key={index}
                        error={getError(index)}
                        control={control}
                        name={`c${index}`}
                      />
                    ))
                  }
                </MatrixKeys>
              </Grid>
              <Grid item>
                <MatrixKeys columns={2} rows={3} title="Matriz B">
                  {
                    matriz2x2.map((cell, index) => (
                      <Input
                        key={index}
                        control={control}
                        name={`d${index}`}
                      />
                    ))
                  }
                </MatrixKeys>
              </Grid>
            </Box>
          </Grid>
          <Box display="flex" flexDirection="row-reverse" className={classes.submit}>
            <SubmitButton
              text="Ingresar"
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Paper>
      </Zoom>
    </React.Fragment>
  )
}

export default Opcion3
