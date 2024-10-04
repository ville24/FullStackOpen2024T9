import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients } : Props ) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
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

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <a href={`/patients/${patient.id}`}>{patient.name}</a>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
