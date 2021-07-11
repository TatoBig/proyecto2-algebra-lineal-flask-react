import React, { useEffect, useState } from 'react'
import Input from '../visual/Input'
import { useForm } from 'react-hook-form'
import MatrixKeys from '../visual/MatrixKeys'
import { Box, Grid, Paper, Zoom, Typography, makeStyles } from '@material-ui/core'
import Header from '../visual/Header'
import { SubmitButton } from '../visual/Buttons'
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

const Opcion2 = (props) => {
  const { returnMenu, checked } = props
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState({})
  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    mode: 'onChange',
  })
  const classes = useStyles()

  const onSubmit = async (data) => {
    let matrix = []
    let contador = 0
    let fila = []
    for (const cell in data) {
      fila.push(parseInt(data[cell]))
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
      await fetch(`${url}/solution2`, requestOptions)
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

  useEffect(() => {
    console.log(results)
  }, [results])

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

  return (
    <React.Fragment>
      <Zoom in={checked} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.paper}>
          <Header
            returnMenu={returnMenu}
            title="Opcion 2"
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
            <Typography variant="h6" color="initial">
              Rango A: {results.rangoA}
            </Typography>
            <Typography variant="h6" color="initial">
              Dimensión del espacio nulo: {results.dimensionnula}
            </Typography>
            <MatrixKeys columns={2} title="Col (A)">
              <Box className={classes.result} display="flex" flexWrap="wrap">
                {
                  results.colA && results.colA.map((row, index) => (
                    row.map(cell => (
                      <Typography key={cell.id} variant="h3" color="initial" className={classes.row} align="center">
                        {Math.round(cell * 1) / 1}
                      </Typography>
                    ))
                  ))
                }
              </Box>
            </MatrixKeys>
            <MatrixKeys columns={2} title="Fila (A)">
              <Box className={classes.result} display="flex" flexWrap="wrap">
                {
                  results.filaA && results.filaA.map((row, index) => (
                    row.map(cell => (
                      <Typography key={cell.id} variant="h3" color="initial" className={classes.row} align="center">
                        {Math.round(cell * 1) / 1}
                      </Typography>
                    ))
                  ))
                }
              </Box>
            </MatrixKeys>
            {
              results.nulA && results.nulA.map((matrix, index) => (
                <MatrixKeys key={matrix.id} columns={1} title={`Nul (A): ${index + 1}`}>
                  <Box className={classes.result} display="flex" flexWrap="wrap">
                    {
                      matrix.map(row => (
                        <Typography key={row.id} variant="h3" color="initial" className={classes.row} align="center">
                          {Math.round(row * 1) / 1}
                        </Typography>
                      ))
                    }
                  </Box>
                </MatrixKeys>
              ))
            }
          </React.Fragment>
        }

      </ResultDialog>
    </React.Fragment>
  )
}

export default Opcion2
