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
    marginTop: theme.spacing(3),
    width: 420
  },
  row: {
    marginRight: theme.spacing(6)
  }
}))

const matriz3x3 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Opcion2 = (props) => {
  const { returnMenu, checked } = props
  const [setOpen] = useState(false)
  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    mode: 'onChange',
  })
  const classes = useStyles()

  const onSubmit = (data) => {
    let matriz = []
    let contador = 0
    let fila = []
    for (const cell in data) {
      fila.push(data[cell])
      contador++
      if (contador === 5) {
        contador = 0
        matriz.push(fila)
        fila = []
      }
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
      case 9:
        return errors.c9
      case 10:
        return errors.c10
      case 11:
        return errors.c11
    }
  }

  // const example = () => {
  //   const example = [1, -2, 2, -3, 15, 3, 4, -1, 1, -6, 2, -3, 2, -1, 17, 1, 1, -3, -2, -7]
  //   example.map((cell, index) => {
  //     setValue(`c${index}`, cell)
  //   })
  // }

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
          </Box>
        </Paper>
      </Zoom>
      {/* <ResultDialog
        open={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
      >
        <MatrixKeys columns={5} title="Matriz final">

        </MatrixKeys>
      </ResultDialog> */}
    </React.Fragment>
  )
}

export default Opcion2
