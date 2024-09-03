import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { newPatientEntrySchema } from '../utils';

import { z } from "zod";
import { NewPatient, Patient } from '../types';

const app = express();

app.use(express.json());

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
  const entry = patientsService.findById(req.params.id);
  if (entry) {
    res.send(entry);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedEntry = patientsService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;