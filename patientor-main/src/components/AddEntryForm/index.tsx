import axios from "axios";
import patientService from "../../services/patients";

import { useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button, Box } from '@mui/material';
import { HealthCheckEntryFormValues, Patient } from "../../types";

interface Props {
    patient: Patient;
}
  
const AddEntryForm = ({ patient }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [error, setError] = useState('');

    console.log(patient.id);

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
            try {
                console.log(values);
                const entry = await patientService.createEntry(patient.id, values);
                console.log(entry);
            }
            catch(e: unknown) {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                    } else {
                    setError("Unrecognized axios error");
                    }
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        };
        submitNewEntry({
            description: description,
            date: date,
            specialist: specialist,
            healthCheckRating: Number(rating),
            type: 'HealthCheck',
            diagnosisCodes: diagnosisCodes.split(','),
        });
        
        /*
          const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
        */
    };
    const onCancel = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setRating('');
        setDiagnosisCodes('');
    };

    return (
        <Box>
            <h3>New HealthCheck entry</h3>
            <div>{error}</div>
            <form onSubmit={addEntry}>
                <TextField
                    label="description"
                    fullWidth 
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="date"
                    fullWidth 
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="specialist"
                    fullWidth 
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField
                    label="rating"
                    fullWidth 
                    value={rating}
                    onChange={({ target }) => setRating(target.value)}
                />
                <TextField
                    label="diagnosisCodes"
                    fullWidth 
                    value={diagnosisCodes}
                    onChange={({ target }) => setDiagnosisCodes(target.value)}
                />
                <Grid style={{ height: "100px" }}>
                    <Grid item>
                        <Button
                        color="secondary"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={onCancel}
                        >
                        Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                        style={{
                            float: "right",
                        }}
                        type="submit"
                        variant="contained"
                        >
                        Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
    
};

export default AddEntryForm;