import express from "express";

import { calcBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  res.send(calcBmi({ weight: weight, height: height }));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});