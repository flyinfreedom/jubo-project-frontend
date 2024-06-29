import * as React from 'react';
import './Patient.css';
import { Card, CardActions, CardContent, CardMedia, Button, Box, Typography } from '@mui/material';

import { IPatient } from '../../models/patient.model';
import { PatientContext } from '../../contexts/patientProvider';

interface IPatientProps {
  patient: IPatient;
}

function Patient(props: IPatientProps) {
  const context = React.useContext(PatientContext)!;

  const { openDialog } = context;

  const handleClickOpen = () => {
    openDialog(props.patient);
  };

  return (
      <Card className="patient_card">
        <CardMedia
          sx={{ height: 200 }}
          image={require(`../../assets/img/patient_${props.patient.id.padStart(2, '0')}.jpg`)}
          title={props.patient.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.patient.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button size="small" sx={{ width: '100%' }} onClick={handleClickOpen}>Show Order</Button>
          </Box>
        </CardActions>
      </Card>
  );
}

export default Patient;
