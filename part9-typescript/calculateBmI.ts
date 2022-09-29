// BMI = mass(kg) / height(m)**2

const calculateBmi = (cm: number, kg: number): string => {
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

console.log(calculateBmi(180, 74));

