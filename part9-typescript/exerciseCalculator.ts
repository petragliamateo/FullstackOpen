interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}
// Entrada de datos: [3, 0, 2, 4.5, 0, 3, 1] => 3 horas el lunes, 0 el martes, 2 el miercoles, etc..
// target es el objetivo diario, p.e. target = 2 serian 2 horas promedio diarias

const exerciseCalculator = (trainned: Array<number>, target: number): Result => {
  const periodLength = trainned.length;
  const trainingDays = trainned.filter((value) => value !== 0).length;
  // Hago sumatoria de todas las horas y divido segun la cantidad de dias:
  const average = trainned.reduce((pv, cv) => pv + cv) / periodLength;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = 'So low!';

  if (average >= 1) {
    rating = average >= 2.5 ? 3 : 2;
    ratingDescription = average >= 2.5 ? 'You are On Fire!' : 'not too bad but could be better'; 
  }

  return { periodLength, trainingDays, target, average, success, rating, ratingDescription };
};

interface exercisesValues {
  target: number;
  trainned: Array<number>;
}
const exerciseArguments = (args: Array<string>): exercisesValues => {
  if (args.length <= 4) throw new Error('Number of arguments error');
  const target = Number(args[2]);
  const trainned = args.slice(3).map((v) => {
    if (isNaN(Number(v))) throw new Error('Invalid arguments');
    return Number(v);
  });
  if (!isNaN(target)){
    return { target, trainned };
  } else{
    throw new Error('Invalid arguments');
  }
};

try {
  const { target, trainned } = exerciseArguments(process.argv);
  console.log(exerciseCalculator(trainned, target));
} catch (error) {
  console.log('error: ', error);
}

