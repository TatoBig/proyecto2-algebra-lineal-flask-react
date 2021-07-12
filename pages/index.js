// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import React, { useState, useEffect } from 'react'
// import Button from '@material-ui/core/Button'

// export default function Home() {
//   const [currentTime, setCurrentTime] = useState('Cargando...')

//   useEffect(() => {
//     fetch('http://localhost:5000/time')
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//       })
//       .catch(e => console.log(e))
//   }, [])

//   const sendMatrix = async () => {
//     const matrixp = [
//       [1, 5, 4, 1],
//       [0, -2, -4, 0],
//       [3, 5, 4, 1],
//       [-6, 5, 5, 0]
//     ]
//     try {
//       const requestOptions = {
//         method: 'POST',
//         body: JSON.stringify({ matrix: matrixp }),
//         headers: { 'Content-Type': 'application/json' }
//       }
//       await fetch('http://localhost:5000/test', requestOptions)
//         .then(response => response.json())
//         .then(data => {
//           console.log(data)
//         })
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <header className="App-header">
//         <p>The current time is {currentTime}.</p>
//         <Button variant="contained" color="primary" onClick={() => sendMatrix()}>
//           Envíar matriz
//         </Button>
//       </header>
//     </div>
//   )
// }

import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Paper, makeStyles, Typography, Box, Grid, Zoom, Divider } from '@material-ui/core/'
import Card from '../components/visual/Card'
import { OptionButton } from '../components/visual/Buttons'
import Opcion1 from '../components/code/Opcion1'
import Opcion2 from '../components/code/Opcion2'
import Opcion3 from '../components/code/Opcion3'

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2)
  }
}))

export default function Home() {
  const [checked, setChecked] = useState(0)
  const classes = useStyles()

  const handleChange = (check) => {
    setChecked(-1)
    setTimeout(() => {
      setChecked(check)
    }, 200)
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Zoom in={checked === 0} mountOnEnter unmountOnExit>
          <Paper>
            <Card
              title="Proyecto de Álgebra Lineal."
            >
              <Box display="flex" justifyContent="center">
                <Grid container spacing={3} direction="column">
                  <Grid item xs={12}>
                    <OptionButton
                      fullWidth
                      onClick={() => handleChange(1)}
                      text="Opción 1"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OptionButton
                      fullWidth
                      onClick={() => handleChange(2)}
                      text="Opción 2"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <OptionButton
                      fullWidth
                      onClick={() => handleChange(3)}
                      text="Opción 3"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Divider className={classes.divider}/>
              <Typography variant="h6" color="initial" align="center">
                Santiago José Navas Maldonado 1551619
              </Typography>
              <Typography variant="h6" color="initial" align="center">
                Paolo Giovanni Veliz Sulecio 1543219
              </Typography>
              <Typography variant="h6" color="initial" align="center">
                Jeffrey Manrique Reyes Vásquez 1603719
              </Typography>
              <Typography variant="h6" color="initial" align="center">
                Alison Carolina Ramos Carrera 1510819
              </Typography>
            </Card>
          </Paper>
        </Zoom>
        <Opcion1
          returnMenu={() => handleChange(0)}
          checked={checked === 1}
        />
        <Opcion2
          returnMenu={() => handleChange(0)}
          checked={checked === 2}
        />
        <Opcion3
          returnMenu={() => handleChange(0)}
          checked={checked === 3}
        />
      </div>
    </React.Fragment>
  )
}

