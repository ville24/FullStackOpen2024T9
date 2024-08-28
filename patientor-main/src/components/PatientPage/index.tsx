import { Box } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnosis";
import { Patient, Diagnosis } from "../../types";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
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

        const fetchDiagnosis = async (): Promise<Diagnosis | undefined> => {
            const d = await diagnoseService.getAll();
            setDiagnosis(d);
            return undefined;
        };
        
        fetchDiagnosis();
    }, [id]);

    const getDiagnoseName = (code: string) => {
        const codeEntry = diagnosis.find(d => d.code === code);
        if (codeEntry) { return codeEntry.name; }
        else { return ''; }
    };

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
                <h3>entries</h3>
                {
                    patient.entries.map(entry => 
                        <div key={entry.id}>
                            <div>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></div>
                            <ul>
                                {
                                    entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
                                        <li key={code}>{code} {getDiagnoseName(code)}</li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                }
            </Box>
            </div>
        );
    }
};

export default PatientPage;
