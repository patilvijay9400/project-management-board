import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Toaster = ({ open, message }) => {
    // call function after 3s  to close the snackbar
    
  return (
    <Snackbar open={open} autoHideDuration={3000}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
  )
}

export default Toaster;