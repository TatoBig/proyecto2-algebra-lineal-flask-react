import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Slide } from '@material-ui/core'
import React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResultDialog = (props) => {
  const { open, setOpen, children, fullWidth, onClose, maxWidth } = props
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          onClose()
          setOpen(false)
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="alert-dialog-slide-title">Resultado</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            onClose()
            setOpen(false)
          }} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ResultDialog
