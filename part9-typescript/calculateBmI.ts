// BMI = mass(kg) / height(m)**2

export const calculateBmi = (cm: number, kg: number): string => {
  const bmi = kg / ((cm / 100) ** 2);
  switch (true) {
    case bmi <= 16.0:
      return 'Underweight (Severe thinness)';
    case bmi <= 16.9:
      return 'Underweight (Moderate thinness)';
    case bmi <= 18.4:
      return 'Underweight (Mild thinness)';
    case bmi <= 24.9:
      return 'Normal range';
    case bmi <= 29.9:
      return 'Overweight (Pre-obese)';
    case bmi <= 34.9:
      return 'Obese (Class I)';
    case bmi <= 39.9:
      return 'Obese (Class II)';
    case bmi > 39.9:
      return 'Obese (Class III)';

    default:
      return 'Algo salio mal.';
  }
}

interface admitedValues {
  value1: number;
  value2: number;
}
const parseArguments = (args: Array<string>): admitedValues => {
  if (args.length !== 4) throw new Error('Number of arguments error');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return { value1: Number(args[2]), value2: Number(args[3]) };
  } else{
    throw new Error('Invalid arguments');
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error) {
  console.log('error: ', error);
}


