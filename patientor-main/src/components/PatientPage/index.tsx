import { Box } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import patientService from "../../services/patients";
//import { Patient } from "../../types";

/*interface Props {
  patientId : String | undefined
}*/

const fetchPatient = async (id: string | undefined) => {
    if (id) {
      console.log('fetchPatient', id)
      const p = await patientService.findById(id);
        return p;
    }
  }

const PatientPage = async () => {
    const { id } = useParams();
    console.log('iddd', id);
    if (id) {
        const patient = await fetchPatient(id);
        console.log(patient)
    
        if (!patient) {
            return null;
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
        };
    };
return null;
};

export default PatientPage;
