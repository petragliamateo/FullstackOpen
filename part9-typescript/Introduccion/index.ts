import express from 'express';

import { calculateBmi } from './calculateBmI';
import { exerciseCalculator, exerciseArguments } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))){
    const bmi: string = calculateBmi(Number(height), Number(weight));
    const data = { height, weight, bmi };
    return res.json(data);
  }
  return res.json({ error: "malformatted parameters" });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target: targetValue } = req.body;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
    const { target, trainned } = exerciseArguments(['', '', targetValue, ...daily_exercises]);
    const data = exerciseCalculator(trainned, target);
    res.json(data);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.json({ error });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
