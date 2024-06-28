import React, { useEffect, useState } from 'react';
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

interface IOrderDialogInfo {
  open: boolean;
  patientId: string;
  name: string;
  orderIds: Array<string> | undefined;
  onAddOrder: (orderIds: Array<string>) => void;
  onCloseDialog: () => void;
}

function OrderDialog(props: IOrderDialogInfo) {
  const [open] = useState(props.open);
  const [createMode, setCreateMode] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [orderIds] = useState(props.orderIds);
  const [orders, setOrders] = useState<Array<IOrder>>([]);

  useEffect(() => {
    setLoadingStatus(true);
    !!orderIds && orderIds.length !== 0
      ? searchOrder(orderIds)
        .then(response => {
          setOrders((response.data as IOrder[]).sort((a, b) => +a.id - +b.id));
        })
        .catch(error => {
          alert(error);
        })
        .finally(() => {
          setLoadingStatus(false);
        })
      : setLoadingStatus(false);
  }, [orderIds, props.open, props.orderIds]);

  const handleCloseDialog = () => {
    setCreateMode(false);
    props.onCloseDialog();
  };

  const handleLeaveCreateMode = () => {
    setCreateMode(false);
  }

  const handleCreated = (order: IOrder) => {
    orders.push(order);
    props.onAddOrder(orders.map(o => o.id));
  }

  return <Dialog
    fullWidth={true}
    open={open}
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
        createMode && <OrderForm orderId={null} mode={'create'} patientId={props.patientId} message={''} leaveCreateMode={handleLeaveCreateMode} created={handleCreated}></OrderForm>
      }
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog}>Close</Button>
    </DialogActions>
  </Dialog>;
}

export default OrderDialog;
