import React, { useEffect, useState } from 'react';
import './App.css';

import Patient from './widgets/patient/Patient';
import { IPatient } from './models/patient.model';
import { getPatients } from './api/patient.api';

import { Backdrop, CircularProgress } from '@mui/material';
import OrderDialog from './widgets/order/OrderDialog';


function App() {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setopenBackdrop] = React.useState(false);

  useEffect(() => {
    setopenBackdrop(true);
    getPatients()
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setopenBackdrop(false);
      });
  }, []);

  const handleDialogOpen = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient!);
    setOpen(true);
  }

  const handleOrderIdOfPatient = (orderIds: Array<string>) => {
    selectedPatient!.orderId = orderIds.join(',');
  }

  return (
    <div className="App">
      <React.Fragment>
        {
          patients.map(patient => (
            <Patient key={patient.id} patient={patient} onClickShowOrder={handleDialogOpen} />
          ))
        }
        {
          !!selectedPatient && <OrderDialog
            open={open}
            name={selectedPatient.name}
            patientId={selectedPatient.id}
            orderIds={selectedPatient.orderId?.split(',', ).filter(str => str !== '')}
            onAddOrder={handleOrderIdOfPatient}
            onCloseDialog={() => setSelectedPatient(null)} />
        }

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    </div>
  );
}

export default App;
