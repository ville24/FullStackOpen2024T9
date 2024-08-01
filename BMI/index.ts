import express, { Request } from "express";

import { calcBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request<{ weight: string, height: string }, any, any, any, any>, res) => {
  const { weight, height } = req.query
  res.send(calcBmi({ weight: weight, height: height }));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});