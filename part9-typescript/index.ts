import express from 'express';

import { calculateBmi } from './calculateBmI'

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))){
    const bmi = calculateBmi(Number(height), Number(weight))
    const data = { height, weight, bmi };
    return res.json(data);
  }
  return res.json({ error: "malformatted parameters" })
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
