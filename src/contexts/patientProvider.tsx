import React, { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { IPatient } from '../models/patient.model';
import { Backdrop, CircularProgress } from '@mui/material';
import { getPatients } from '../api/patient.api';
import { IOrder } from '../models/order.model';
import { searchOrder } from '../api/order.api';

interface PatientContextType {
  patients: IPatient[];
  selectedPatient: IPatient | null;  
  open: boolean;
  loading: boolean;
  orders: IOrder[];
  pushOrder: (order: IOrder) => void;
  openDialog: (patient: IPatient) => void;
  closeDialog: () => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientProviderProps {
  children: ReactNode;
}

const PatientProvider: FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [openBackdrop, setopenBackdrop] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  
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

  const pushOrder = (order: IOrder) => {
    orders.push(order);
    setOrders(orders);

    const orderIds = (selectedPatient!.orderId ?? '').split(',').filter(id => id !== '');
    orderIds.push(order.id);
    setPatients(prevPatients => prevPatients.map(patient => 
      patient.id === selectedPatient!.id ? { ...patient, orderId: orderIds.join(',') } : patient
    ));
  }

  const openDialog = (patient: IPatient) => {
    setOpen(true);
    setSelectedPatient(patient);

    if (!!patient.orderId) {
      setLoading(true);
      searchOrder(patient.orderId.split(',').filter(id => id !== ''))
          .then(response => {
              setOrders(response.data);
          })
          .catch(error => {
              alert(error);
          })
          .finally(() => {
              setLoading(false);
          });
  }
}

  const closeDialog = () => {
    setSelectedPatient(null);
    setOrders([]);
    setOpen(false);
  }
  
  return (
    <PatientContext.Provider value={{ patients, selectedPatient, open, loading, orders, pushOrder, openDialog, closeDialog }}>
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