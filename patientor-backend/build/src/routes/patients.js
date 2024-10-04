"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getEntries());
});
router.get('/:id', (req, res) => {
    const entry = patientsService_1.default.findById(req.params.id);
    if (entry) {
        res.send(entry);
    }
    else {
        res.sendStatus(404);
    }
});
const newEntryParser = (req, _res, next) => {
    try {
        const id = (0, uuid_1.v1)();
        const newEntryObject = Object.assign({ id: id }, req.body);
        (0, utils_1.newEntrySchemaParse)(newEntryObject);
        next();
    }
    catch (error) {
        next(error);
    }
};
router.post('/:id/entries', newEntryParser, (req, res) => {
    const addedEntry = patientsService_1.default.addEntry(req.params.id, req.body);
    res.json(addedEntry);
});
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.newPatientEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post('/', newPatientParser, (req, res) => {
    const addedEntry = patientsService_1.default.addPatient(req.body);
    res.json(addedEntry);
});
router.use(errorMiddleware);
exports.default = router;
