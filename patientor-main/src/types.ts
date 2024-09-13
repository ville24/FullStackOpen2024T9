
export interface Error {
  code: string;
  path: string;
  message: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry  {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  },
}

export interface HospitalEntry extends BaseEntry  {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  },
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;