import React, { useContext, useState } from 'react';
import './App.css';
import Patient from './widgets/patient/Patient';
import { IPatient } from './models/patient.model';
import OrderDialog from './widgets/order/OrderDialog';
import { PatientContext, PatientProvider } from './contexts/patientProvider';


function App() {
  const context = useContext(PatientContext)!;

  const { patients, selectedPatient, openDialog } = context;

  const handleOrderIdOfPatient = (orderIds: Array<string>) => {
    selectedPatient!.orderId = orderIds.join(',');
  }

  return (
    <div className="App">
        <React.Fragment>
          {
            patients.map(patient => (
              <Patient key={patient.id} patient={patient} />
            ))
          }
          {
            !!selectedPatient && <OrderDialog
              name={selectedPatient.name}
              patientId={selectedPatient.id}/>
          }
        </React.Fragment>
    </div>
  );
}

const wrapper = () => (  
  <PatientProvider>
    <App />
  </PatientProvider>
)

export default wrapper;