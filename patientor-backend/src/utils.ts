import { z } from "zod";

import { Gender, NewPatient, NewEntry, BaseEntry, HealthCheckRating } from './types';


const newEntrySchema = z.object({
    id: z.string(),
    description: z.string().min(1),
    date: z.string().date(),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
});

const newEntrySchemaOccupationalHealthcare = newEntrySchema.extend({
    type: z.enum(['OccupationalHealthcare']),
    employerName: z.string().min(1),
    sickLeave: z.object({
        startDate: z.string(),
        endDate: z.string(),
    }).optional(),
});

const newEntrySchemaHospital = newEntrySchema.extend({
    type: z.enum(['Hospital']),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string().min(1),
    }),
});

const newEntrySchemaHealthCheck = newEntrySchema.extend({
    type: z.enum(['HealthCheck']),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const newPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.union([newEntrySchemaOccupationalHealthcare, newEntrySchemaHospital, newEntrySchemaHealthCheck]).array(),
});

export const toNewPatientEntry = (object: unknown): NewPatient => {
    return newPatientEntrySchema.parse(object);
};

export const newEntrySchemaParse = (object: any): NewEntry | BaseEntry  => {
    switch (object.type) {
        case 'OccupationalHealthcare':
            return newEntrySchemaOccupationalHealthcare.parse(object);
        case 'Hospital':
            return newEntrySchemaHospital.parse(object);
        case 'HealthCheck':
            return newEntrySchemaHealthCheck.parse(object);
        default:
            return newEntrySchema.extend({type: z.enum(['OccupationalHealthcare', 'Hospital', 'HealthCheck'])}).parse(object);
    }
}