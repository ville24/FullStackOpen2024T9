import { z } from "zod";

import { Gender,NewPatient } from './types';


export const newEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

const newEntrySchemaOccupationalHealthcare = newEntrySchema.extend({
    type: z.enum(['OccupationalHealthcare']),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string(),
        endDate: z.string(),
    }).optional(),
});

const newEntrySchemaHospital = newEntrySchema.extend({
    type: z.enum(['Hospital']),
    discharge: z.object({
        date: z.string(),
        criteria: z.string(),
    }),
});

export const newEntrySchemaHealthCheck = newEntrySchema.extend({
    type: z.enum(['HealthCheck']),
    healthCheckRating: z.number(),
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