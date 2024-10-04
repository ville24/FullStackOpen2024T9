import express from "express";

import { calcBmi } from "./bmiCalculator";
import { calcExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: string = String(req.query.weight);
  const height: string = String(req.query.height);
  res.send(calcBmi({ weight: weight, height: height }));
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  res.json(calcExercises({ target: req.body.target, daily_exercises: req.body.daily_exercises }));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});