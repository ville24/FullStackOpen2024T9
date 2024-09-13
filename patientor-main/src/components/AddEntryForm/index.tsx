import axios from "axios";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnosis";

import { useEffect, useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button, Box, Alert, FormControl, MenuItem, InputLabel, Input, OutlinedInput } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Patient, Entry, Type, Diagnosis, NewOccupationalHealthcareEntry, NewHospitalEntry, NewHealthCheckEntry } from "../../types";

interface Props {
    patient: Patient;
    handleEntry: (values: Entry) => void;
}

const AddEntryForm = ({ patient, handleEntry }: Props) => {
    const [type, setType] = useState(Type.OccupationalHealthcare);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [diagnosisCodesAll, setDiagnosisCodesAll] = useState<Diagnosis[]>([]);
    const [employerName, setEmployerName] = useState('');
    const [sickleaveStart, setSickleaveStart] = useState('');
    const [sickleaveEnd, setSickleaveEnd] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDiagnosis = async (): Promise<Diagnosis | undefined> => {
            const d = await diagnoseService.getAll();
            setDiagnosisCodesAll(d);
            return undefined;
        };
        
        fetchDiagnosis();
    }, []);

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        const submitNewEntry = async (values: NewOccupationalHealthcareEntry | NewHospitalEntry | NewHealthCheckEntry) => {
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
        if (type === Type.OccupationalHealthcare) {
            submitNewEntry({
                description: description,
                date: date,
                specialist: specialist,
                type: type,
                diagnosisCodes: diagnosisCodes,
                employerName: employerName,
                sickLeave: {
                    startDate: sickleaveStart,
                    endDate: sickleaveEnd
                }
            });
        }
        if (type === Type.Hospital) {
            submitNewEntry({
                description: description,
                date: date,
                specialist: specialist,
                type: type,
                diagnosisCodes: diagnosisCodes,
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria
                }
            });
        }
        if (type === Type.HealthCheck) {
            submitNewEntry({
                description: description,
                date: date,
                specialist: specialist,
                type: type,
                diagnosisCodes: diagnosisCodes,
                healthCheckRating: Number(rating)
            });
        }
    };
    const onCancel = () => {
        setType(Type.OccupationalHealthcare);
        setDescription('');
        setDate('');
        setSpecialist('');
        setRating('');
        setDiagnosisCodes([]);
        setEmployerName('');
        setSickleaveStart('');
        setSickleaveEnd('');
        setDischargeDate('');
        setDischargeCriteria('');
        setError('');
    };

    const handleDiagnosisCodes = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
          } = event;
          setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value,
          );
    };

    return (
        <Box sx={{ marginTop: 1, marginBottom: 1, padding: 1, border: "1px solid #ccc"}}>
            <h3>New entry</h3>
            {
                error && 
                <Box sx={{ marginTop: 2, marginBottom: 2, }}>
                    <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>{error}</Alert>
                </Box>
            }
            <form onSubmit={addEntry}>
                <FormControl fullWidth sx={{ marginBottom: 2, }}>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        label="Type"
                        onChange={({ target }) => setType(target.value as Type)}
                    >
                        <MenuItem value={Type.OccupationalHealthcare}>OccupationalHealthcare</MenuItem>
                        <MenuItem value={Type.Hospital}>Hospital</MenuItem>
                        <MenuItem value={Type.HealthCheck}>HealthCheck</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    sx={{ marginBottom: 2, }}
                    label="Description"
                    fullWidth 
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <InputLabel id="date">Date</InputLabel>
                <Input
                    id='date'
                    type="date" 
                    sx={{ marginBottom: 2, }}
                    fullWidth 
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    sx={{ marginBottom: 2, }}
                    label="Specialist"
                    fullWidth 
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                {
                    type === Type.HealthCheck &&
                    <TextField
                        sx={{ marginBottom: 2, }}
                        label="Health check rating"
                        fullWidth 
                        value={rating}
                        onChange={({ target }) => setRating(target.value)}
                    />
                }
                <FormControl sx={{ marginBottom: 2, width: '100%' }}>
                    <InputLabel id="diagnosisCodes-label">Diagnosis codes</InputLabel>
                    <Select
                    labelId="diagnosisCodes-label"
                    id="diagnosisCodes"
                    multiple
                    value={diagnosisCodes}
                    onChange={handleDiagnosisCodes}
                    input={<OutlinedInput label="diagnosisCodes-label" />}
                    >
                    {diagnosisCodesAll.map((code) => (
                        <MenuItem
                            key={code.code}
                            value={code.code}
                        >
                        {code.code}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                {
                    type === Type.OccupationalHealthcare &&
                    <>
                        <TextField
                            sx={{ marginBottom: 2, }}
                            label="Employer name"
                            fullWidth 
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                        />
                        <InputLabel id="sickleaveStart">Sickleave start</InputLabel>
                        <Input
                            id='sickleaveStart'
                            type="date" 
                            sx={{ marginBottom: 2, }}
                            fullWidth 
                            value={sickleaveStart}
                            onChange={({ target }) => setSickleaveStart(target.value)}
                        />
                        <InputLabel id="sickleaveEnd">Sickleave end</InputLabel>
                        <Input
                            id='sickleaveEnd'
                            type="date" 
                            sx={{ marginBottom: 2, }}
                            fullWidth 
                            value={sickleaveEnd}
                            onChange={({ target }) => setSickleaveEnd(target.value)}
                        />
                    </>
                }
                {
                    type === Type.Hospital &&
                    <>
                        <InputLabel id="DischargeDate">Discharge date</InputLabel>
                        <Input
                            id='DischargeDate'
                            type="date" 
                            sx={{ marginBottom: 2, }}
                            fullWidth 
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                        />
                        <TextField
                            sx={{ marginBottom: 2, }}
                            label="Discharge criteria"
                            fullWidth 
                            value={dischargeCriteria}
                            onChange={({ target }) => setDischargeCriteria(target.value)}
                        />
                    </>
                }
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