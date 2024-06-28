import React, { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { IPatient } from '../models/patient.model';
import { Backdrop, CircularProgress } from '@mui/material';
import { getPatients } from '../api/patient.api';

interface PatientContextType {
  patients: IPatient[];
  selectedPatient: IPatient | null;
  openDialog: boolean;
  updateOrderId: (patientId: string, orderIds: string) => void;
  handleShowOrder: (patientId: string) => void;
  closeDialog: () => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientProviderProps {
  children: ReactNode;
}

const PatientProvider: FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [openBackdrop, setopenBackdrop] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  
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

  const updateOrderId = (patientId: string, newOrderId: string) => {
    const orderIds = (selectedPatient!.orderId ?? '').split(',').filter(id => id !== '');
    orderIds.push(newOrderId);
    setPatients(prevPatients => prevPatients.map(patient => 
      patient.id === patientId ? { ...patient, orderId: orderIds.join(',') } : patient
    ));
  }

  const handleShowOrder = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient!);
    setOpenDialog(true);
  }

  const closeDialog = () => {
    setSelectedPatient(null);
    setOpenDialog(false);
  }
  
  return (
    <PatientContext.Provider value={{ patients, selectedPatient, openDialog, updateOrderId, handleShowOrder, closeDialog }}>
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </PatientContext.Provider>
  );
};

export { PatientProvider, PatientContext };