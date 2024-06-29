import React, { useContext, useState } from 'react';
import './OrderDialog.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';
import Loader from '../../components/loader/Loader';
import OrderForm from './OrderForm';
import { PatientContext } from '../../contexts/patientProvider';

function OrderDialog() {
  const [createMode, setCreateMode] = useState(false);
  const { selectedPatient, orders, open, loading, closeDialog } = useContext(PatientContext)!;

  const handleCloseDialog = () => {
    closeDialog();
    setCreateMode(false);
  };

  const handleLeaveCreateMode = () => {
    setCreateMode(false);
  }

  return <Dialog
    fullWidth={true}
    open={open}
    maxWidth='lg'
    onClose={handleCloseDialog}
  >
    <DialogTitle>{!!selectedPatient ? `${selectedPatient.name}'s Order` : ''}</DialogTitle>
    <IconButton
      aria-label="Create Mode"
      onClick={() => setCreateMode(true)}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <AddIcon />
    </IconButton>
    <DialogContent>
      {
        loading
          ? <div className='loader-wrapper'><Loader /></div>
          : orders.length !== 0
            ? orders.sort((a, b) => { return +a.id - +b.id; }).map(order => <OrderForm key={order.id} orderId={order.id} mode={'read'} message={order.message}></OrderForm>)
            : !createMode && <span className="tip">Please click the + in the upper right corner to add a new medical order.</span>
      }
      {
        createMode && <OrderForm mode={'create'} message={''} leaveCreateMode={handleLeaveCreateMode}></OrderForm>
      }
    </DialogContent>
    <DialogActions>
      <Button onClick={closeDialog}>Close</Button>
    </DialogActions>
  </Dialog>;
}

export default OrderDialog;
