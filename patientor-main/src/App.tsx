import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  //const [patient, setPatient] = useState<Patient>();
  //const [id, setId] = useState<string>()

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
/*
  //useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      if (id) {
        console.log('fetchPatient', id)
        const p = await patientService.findById(id);
        setPatient(p);
      }
    }
  //  void fetchPatient(id);
  //}, [id]);

  console.log(useParams())
  if (useParams().id) {
    setId(useParams().id)
  }

  const PatientPage = () => {
    const { id } = useParams();
    console.log('iddd', id);
    if (id) {
      const p = patientService.findById(id);
      console.log(p)
    }
    return null;
  }
*/
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage  />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
