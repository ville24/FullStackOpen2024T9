"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patients = patients_1.default;
const getEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id: id }, entry);
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    const patient = findById(patientId);
    const entryId = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id: entryId }, entry);
    if (patient) {
        patient.entries.push(newEntry);
    }
    return newEntry;
};
const findById = (id) => {
    const entry = patients.find(d => d.id === id);
    return entry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    addEntry,
    findById
};
