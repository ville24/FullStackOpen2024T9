import { Box } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async (id: string | undefined): Promise<Patient | undefined> => {
            if (id) {
                const p = await patientService.findById(id);
                setPatient(p);
            }
            return undefined;
        };
        
        fetchPatient(id);
    }, [id]);

    if (!patient) {
        return (<></>);
    }
    else {
        return (
            <div className="App">
            <Box>
                <h2>
                    {patient && patient.name}
                    {patient.gender === 'male' && <Male></Male>}
                    {patient.gender === 'female' && <Female></Female>}
                    {patient.gender === 'other' && <Transgender></Transgender>}
                </h2>
                <div>ssh: {patient.ssn}</div>
                <div>occupation: {patient.occupation}</div>
            </Box>
            </div>
        );
    }
};

export default PatientPage;
