import axios from "axios";
import patientService from "../../services/patients";

import { useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button, Box, Alert } from '@mui/material';
import { HealthCheckEntryFormValues, Patient, Entry } from "../../types";

interface Props {
    patient: Patient;
    handleEntry: (values: Entry) => void;
}

const AddEntryForm = ({ patient, handleEntry }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [error, setError] = useState('');

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
            try {
                const entry = await patientService.createEntry(patient.id, values);
                handleEntry(entry);
                setError("");
            }
            catch(e: unknown) {
                type CustomError = { code: string, path: string[], message: string };
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data?.error && e.response.data.error.length) {
                        let message = '';
                        e.response.data.error.forEach((item: CustomError) => {
                            message += `${item.code}: ${item.path[0]} (${item.message})${"\n"}`;
                        });
                        setError(message);
                    } else {
                        setError("Unrecognized axios error");
                    }
                } else {
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
    };
    const onCancel = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setRating('');
        setDiagnosisCodes('');
    };

    return (
        <Box sx={{ marginTop: 1, marginBottom: 1, }}>
            <h3>New HealthCheck entry</h3>
            {
                error && 
                <Box sx={{ marginTop: 2, marginBottom: 2, }}>
                    <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{error}</Alert>
                </Box>
            }
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
                <Box sx={{ marginTop: 2, }}>
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
                    </Box>
            </form>
        </Box>
    );
    
};

export default AddEntryForm;