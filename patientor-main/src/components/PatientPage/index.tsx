import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Male, Female, Transgender, LocalHospital, MedicalInformation, OtherHouses, Favorite } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnosis";
import { Patient, Diagnosis, Entry } from "../../types";
import AddEntryForm from '../AddEntryForm';

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

    const assertNever = (value: never): never => {
        throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const EntryDetails:React.FC<{ entry : Entry }> = ({ entry }) => {

        const EntryDate = () =>
            <span>{entry.date}</span>;

        const EntryType = () =>
            <span>
                {entry.type === 'Hospital' && <LocalHospital />}
                {entry.type === 'OccupationalHealthcare' && <OtherHouses />}
                {entry.type === 'HealthCheck' && <MedicalInformation />}
            </span>;

        const EntryDescription = () =>
            <div style={{fontStyle: 'italic'}}>{entry.description}</div> ;

        const EntryDiagnosis = () =>
            <ul>
                {
                    entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
                        <li key={code}>{code} {getDiagnoseName(code)}</li>
                    )
                }
            </ul>;
        
        const EntryDischarge = () => 
            <div>{entry.type === 'Hospital' && entry.discharge.date + ' ' + entry.discharge.criteria}</div>;

        const Specialist = () =>
            <div>Diagnose by {entry.specialist}</div>;
            
        const HealthCheckRating = () => {
            if (entry.type==='HealthCheck') {
                let healtCheckRatingStyle;
                if (entry.healthCheckRating === 0) { healtCheckRatingStyle = {color: 'green'}; }
                if (entry.healthCheckRating === 1) { healtCheckRatingStyle = {color: 'yellow'}; }
                if (entry.healthCheckRating === 2) { healtCheckRatingStyle = {color: 'red'}; }
                if (entry.healthCheckRating === 3) { healtCheckRatingStyle = {color: 'black'}; }
            
                return (
                    <div>{entry.type==='HealthCheck' && <Favorite style={healtCheckRatingStyle} />}</div>
                );
            }
        };

        const Employer = () =>
            <span>{entry.type === 'OccupationalHealthcare' && entry.employerName}</span>;

        const SickLeave = () =>
            <div>{entry.type === 'OccupationalHealthcare' && entry.sickLeave && 'Sick leave: ' + entry.sickLeave.startDate + ' - ' + entry.sickLeave.endDate}</div>;

        const HospitalEntry = () => 
            <div>
                <div><EntryDate /> <EntryType /></div>
                <EntryDescription />                                
                <EntryDiagnosis />
                <EntryDischarge />
                <Specialist />
            </div>;

        const OccupationalHealthcare = () => 
            <div>
                <div><EntryDate /> <EntryType /><Employer /></div>
                <EntryDescription />                                
                <EntryDiagnosis />
                <SickLeave />
                <Specialist />
            </div>;

        const HealthCheck = () => 
            <div>
                <div><EntryDate /> <EntryType /></div>
                <EntryDescription />                                
                <EntryDiagnosis />
                <HealthCheckRating />
                <Specialist />
            </div>;


        switch (entry.type) {
            case "Hospital":
                return <HospitalEntry />;
            
            case "OccupationalHealthcare":
                return <OccupationalHealthcare />;
            
            case "HealthCheck":
                return <HealthCheck />;

            default:
                assertNever(entry as never);
        }
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
                <AddEntryForm patient={patient} />
                <h3>entries</h3>
                {
                    patient.entries.map(entry =>
                        <Card variant="outlined" key={entry.id}>
                            <CardContent>
                                <EntryDetails entry={entry} />
                            </CardContent>
                        </Card>
                    )
                }
            </Box>
            </div>
        );
    }
};

export default PatientPage;
