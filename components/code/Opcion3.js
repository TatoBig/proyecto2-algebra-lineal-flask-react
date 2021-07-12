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
    width: 600,
    padding: theme.spacing(4)
  },
  result: {
    marginTop: theme.spacing(3)
    // width: 420
  },
  row: {
    marginRight: theme.spacing(6)
  },
}))

const url = 'http://localhost:5000'
const matriz3x3 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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
  const [results, setResults] = useState({})
  const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const classes = useStyles()

  const onSubmit = async (data) => {
    let matrix = []
    let contador = 0
    let fila = []
    for (let i = 0; i < Object.keys(data).length; i++) {
      fila.push(parseInt(getValues(`c${i}`)))
      contador++
      if (contador === 3) {
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
      await fetch(`${url}/solution3`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setResults(data)
        })
    } catch (e) {
      console.log(e)
    }

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
      case 8:
        return errors.c8
    }
  }

  const example = () => {
    const example = [3, -5, -3, 6, -2, 0, -8, 4, 1]
    example.map((cell, index) => {
      setValue(`c${index}`, cell)
    })
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
                <MatrixKeys columns={3} rows={4} title="Matriz A" >
                  {
                    matriz3x3.map((cell, index) => (
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
        setOpen={setOpen}
        onClose={() => setOpen(false)}
      >
        {
          results &&
          <React.Fragment>
            {
              results.valores && results.valores.map((valor, index) => (
                <React.Fragment key={index}>
                  <Typography variant="h6" color="initial" >
                    Valor propio {index + 1}: {valor}
                  </Typography>
                  <MatrixKeys columns={1} title={`Vector propio: ${index + 1}`}>
                    <Box className={classes.result} display="flex" flexWrap="wrap">
                      {
                        results.vectores[index][0].map(cell => (
                          <Typography key={cell.id} variant="h3" color="initial" className={classes.row} align="center">
                            {Math.round(cell * 100) / 100}
                          </Typography>
                        ))
                      }
                    </Box>
                  </MatrixKeys>
                </React.Fragment>
              ))
            }
          </React.Fragment>
        }

      </ResultDialog>

    </React.Fragment>
  )
}

export default Opcion3
