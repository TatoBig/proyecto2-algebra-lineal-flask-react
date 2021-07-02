import React, { useState } from 'react'
import { Grid, Typography, Box, makeStyles, Paper, Zoom } from '@material-ui/core/'
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
    width: 720,
    padding: theme.spacing(4)
  },
  result: {
    marginTop: theme.spacing(3)
  },
  row: {
    margin: theme.spacing(2)
  }
}))

const url = 'http://localhost:5000'
const matriz4x4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15]

const schema = yup.object().shape({
  c0: yup.string().required('Falta dato'),
  c1: yup.string().required('Falta dato'),
  c2: yup.string().required('Falta dato'),
  c3: yup.string().required('Falta dato'),
  c4: yup.string().required('Falta dato'),
  c5: yup.string().required('Falta dato'),
  c6: yup.string().required('Falta dato'),
  c7: yup.string().required('Falta dato'),
  c8: yup.string().required('Falta dato'),
  c9: yup.string().required('Falta dato'),
  c10: yup.string().required('Falta dato'),
  c11: yup.string().required('Falta dato'),
  c12: yup.string().required('Falta dato'),
  c13: yup.string().required('Falta dato'),
  c14: yup.string().required('Falta dato'),
  c15: yup.string().required('Falta dato')
})

const Opcion1 = (props) => {
  const { returnMenu, checked } = props
  const [open, setOpen] = useState(false)
  const [detResult, setDetResult] = useState(0)
  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const classes = useStyles()

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
      case 8:
        return errors.c8
      case 9:
        return errors.c9
      case 10:
        return errors.c10
      case 11:
        return errors.c11
      case 12:
        return errors.c12
      case 13:
        return errors.c13
      case 14:
        return errors.c14
      case 15:
        return errors.c15
    }
  }

  const onSubmit = async (data) => {
    let matrix = []
    let contador = 0
    let fila = []
    for (const cell in data) {
      fila.push(parseInt(data[cell]))
      contador++
      if (contador === 4) {
        contador = 0
        matrix.push(fila)
        fila = []
      }
    }

    try {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ matrix: matrix }),
        headers: { 'Content-Type': 'application/json' }
      }
      await fetch(`${url}/determinant`, requestOptions)
        .then(response => response.json())
        .then(data => {
          setDetResult(data.result)
        })
    } catch (e) {
      console.log(e)
    }
    setOpen(true)
  }

  const example = () => {
    const example = [1, 5, 4, 1, 0, -2, -4, 0, 3, 5, 4, 1, -6, 5, 5, 0]
    example.map((cell, index) => {
      setValue(`c${index}`, cell)
    })
  }

  return (
    <React.Fragment>
      <Zoom in={checked} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.paper}>
          <Header
            returnMenu={returnMenu}
            title="Opcion 1"
          />
          <Grid container spacing={0}>
            <Box display="flex">
              <Grid item>
                <MatrixKeys columns={4} rows={3} title="Matriz A">
                  {
                    matriz4x4.map((cell, index) => (
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
            </Box>
          </Grid>
          <Box display="flex" flexDirection="row-reverse" className={classes.submit}>
            <SubmitButton
              text="Ingresar"
              onClick={handleSubmit(onSubmit)}
            />
            <SubmitButton
              text="Ejemplo"
              onClick={() => example()}
            />
          </Box>
        </Paper>
      </Zoom>
      <ResultDialog
        open={open}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
      >
        <Typography variant="h6" color="initial">
          {detResult}
        </Typography>
      </ResultDialog>
    </React.Fragment>
  )
}

export default Opcion1
