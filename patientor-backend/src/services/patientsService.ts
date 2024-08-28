import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';

import { NewPatient, NonSensitivePatient, Patient } from '../types';

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({    
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string | undefined): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById
};