import React, { useContext } from 'react';
import './OrderForm.css';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { createOrder, updateOrder } from '../../api/order.api';
import EditIcon from '@mui/icons-material/Edit';
import { PatientContext } from '../../contexts/patientProvider';
import { IOrder } from '../../models/order.model';

interface IOrderDialogInfo {
  mode: 'read' | 'create' | 'edit';
  orderId: string | null;
  patientId: string;
  message: string;
  leaveCreateMode?: () => void;
  created?: (order: IOrder) => void;
}

function OrderForm(props: IOrderDialogInfo) {
  const [value, setValue] = React.useState(props.message);
  const [mode, setMode] = React.useState(props.mode);

  const { updateOrderId } = useContext(PatientContext)!;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCreateOrder = () => {
    createOrder(props.patientId, value)
      .then(response => {
        updateOrderId(props.patientId, response.data.id);
        props.created!(response.data);
        props.leaveCreateMode!()
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
      });
  }

  const handleUpdateOrder = () => {
    updateOrder(props.orderId!, value)
      .then(response => {
        setMode('read');
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
      });
  }

  const handleCancel = () => {
    setValue(props.message);
    mode === 'create' && props.leaveCreateMode!();
    setMode('read');
  }

  const renderContent = () => {
    return <div className="flex order_message">
      {
        <React.Fragment>
          <div className="flexible">
            {
              value.split('\n').map((str, index) => (
                <React.Fragment key={index}>
                  {str}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
          <div className="function">
            <IconButton
              aria-label="Edit Mode"
              onClick={() => setMode('edit')}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        </React.Fragment>
      }
    </div>
  }

  return (
    <Box>
      {
        mode === 'read'
          ? renderContent()
          : <div className='textarea_warpper'>
            <TextField
              label={mode === 'create' ? 'create order' : 'edit order'}
              multiline
              rows={4}
              variant="outlined"
              value={value}
              onChange={handleChange}
              fullWidth
              placeholder='please type order content.'
            />
            <div>
              {
                mode === 'create'
                  ? <Button size="small" variant="contained" sx={{ marginTop: 1 }} onClick={handleCreateOrder}>create</Button>
                  : <Button size="small" variant="contained" sx={{ marginTop: 1 }} onClick={handleUpdateOrder}>update</Button>
              }
              <Button size="small" variant="outlined" sx={{ marginTop: 1, marginLeft: 1 }} onClick={handleCancel}>cancel</Button>
            </div>
          </div>
      }
    </Box>
  )
}

export default OrderForm;