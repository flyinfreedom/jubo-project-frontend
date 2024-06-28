import React, { useContext, useEffect, useState } from 'react';
import './OrderDialog.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { searchOrder } from '../../api/order.api';

import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';
import Loader from '../../components/loader/Loader';
import { IOrder } from '../../models/order.model';
import OrderForm from './OrderForm';
import { PatientContext } from '../../contexts/patientProvider';

interface IOrderDialogInfo {
  patientId: string;
  name: string;
}

function OrderDialog(props: IOrderDialogInfo) {
  const context = useContext(PatientContext)!;
  const { openDialog, selectedPatient, closeDialog } = context;
  const [createMode, setCreateMode] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const orderIds: string[] = selectedPatient?.orderId?.split(',').filter(id => id !== '') ?? [];
    if (orderIds.length !== 0) {
      setLoadingStatus(true);
      searchOrder(orderIds)
        .then(response => {
          setOrders((response.data as IOrder[]).sort((a, b) => +a.id - +b.id));
        })
        .catch(error => {
          alert(error);
        })
        .finally(() => {
          setLoadingStatus(false);
        });
    }
  }, [selectedPatient, selectedPatient?.orderId]);

  const handleCloseDialog = () => {
    closeDialog();
    setCreateMode(false);
  };

  const handleLeaveCreateMode = () => {
    setCreateMode(false);
  }

  const pushOrder = (newOrder: IOrder) => {
    orders.push(newOrder);
    setOrders(orders);
  }

  return <Dialog
    fullWidth={true}
    open={openDialog}
    maxWidth='lg'
    onClose={handleCloseDialog}
  >
    <DialogTitle>{`${props.name}'s Order`}</DialogTitle>
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
        loadingStatus
          ? <div className='loader-wrapper'><Loader /></div>
          : orders.length !== 0
            ? orders.map(order => <OrderForm key={order.id} orderId={order.id} mode={'read'} patientId={props.patientId} message={order.message}></OrderForm>)
            : !createMode && <span className="tip">Please click the + in the upper right corner to add a new medical order.</span>
      }
      {
        createMode && <OrderForm orderId={null} mode={'create'} patientId={props.patientId} message={''} leaveCreateMode={handleLeaveCreateMode} created={pushOrder}></OrderForm>
      }
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog}>Close</Button>
    </DialogActions>
  </Dialog>;
}

export default OrderDialog;
