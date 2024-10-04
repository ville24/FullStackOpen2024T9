"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEntrySchemaParse = exports.toNewPatientEntry = exports.newPatientEntrySchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
const newEntrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    description: zod_1.z.string().min(1),
    date: zod_1.z.string().date(),
    specialist: zod_1.z.string().min(1),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
});
const newEntrySchemaOccupationalHealthcare = newEntrySchema.extend({
    type: zod_1.z.enum(['OccupationalHealthcare']),
    employerName: zod_1.z.string().min(1),
    sickLeave: zod_1.z.object({
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
    }).optional(),
});
const newEntrySchemaHospital = newEntrySchema.extend({
    type: zod_1.z.enum(['Hospital']),
    discharge: zod_1.z.object({
        date: zod_1.z.string().date(),
        criteria: zod_1.z.string().min(1),
    }),
});
const newEntrySchemaHealthCheck = newEntrySchema.extend({
    type: zod_1.z.enum(['HealthCheck']),
    healthCheckRating: zod_1.z.nativeEnum(types_1.HealthCheckRating),
});
exports.newPatientEntrySchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string().optional(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    entries: zod_1.z.union([newEntrySchemaOccupationalHealthcare, newEntrySchemaHospital, newEntrySchemaHealthCheck]).array(),
});
const toNewPatientEntry = (object) => {
    return exports.newPatientEntrySchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
const newEntrySchemaParse = (object) => {
    switch (object.type) {
        case 'OccupationalHealthcare':
            return newEntrySchemaOccupationalHealthcare.parse(object);
        case 'Hospital':
            return newEntrySchemaHospital.parse(object);
        case 'HealthCheck':
            return newEntrySchemaHealthCheck.parse(object);
        default:
            return newEntrySchema.extend({ type: zod_1.z.enum(['OccupationalHealthcare', 'Hospital', 'HealthCheck']) }).parse(object);
    }
};
exports.newEntrySchemaParse = newEntrySchemaParse;
