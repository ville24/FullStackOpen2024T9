interface BmiValues {
    value1: number;
    value2: number;
}
  
const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        if (Number(args[2]) === 0) throw new Error('Division by zero')
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}
  
const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow(height/100, 2);

    switch (true) {
        case bmi < 16:
            return 'Underweight (Severe thinness)';
            break;

        case bmi < 17:
            return 'Underweight (Moderate thinness)';
            break;
        
        case bmi < 18.5:
            return 'Underweight (Mild thinness)';
            break;

        case bmi < 25:
            return 'Normal (healthy weight)';
            break;

        case bmi < 30:
            return 'Overweight (Pre-obese)';
            break;

        case bmi < 35:
            return 'Obese (Class I)';
            break;

        case bmi < 40:
            return 'Obese (Class II)';
            break;

        default:
            return 'Obese (Class III) ';
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}