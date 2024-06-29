import React, { useContext } from 'react';
import './App.css';
import Patient from './widgets/patient/Patient';
import OrderDialog from './widgets/order/OrderDialog';
import { PatientContext, PatientProvider } from './contexts/patientProvider';


function App() {
  const patientContext = useContext(PatientContext)!;
  const { patients } = patientContext;

  return (
    <div className="App">
      <React.Fragment>
        {
          patients.map(patient => (
            <Patient key={patient.id} patient={patient} />
          ))
        }
        <OrderDialog />
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