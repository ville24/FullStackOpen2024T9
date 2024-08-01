import { isNotNumber } from "./utils";

interface BmiValues {
    weight: number;
    height: number;
}
interface BmiResult {
    weight: number;
    height: number;
    bmi: string;
}
  
const parseArguments = (params: BmiValues): BmiValues => {
    if (!params.height) throw new Error('Parameter height missing');
    if (!params.weight) throw new Error('Parameter weight missing');

    if (!isNotNumber(params.height) && !isNotNumber(params.weight)) {
        if (Number(params.height) === 0) throw new Error('Division by zero')
        return {
            weight: Number(params.weight),
            height: Number(params.height)
        }
    } else {
        throw new Error('malformatted parameters');
    }
}
  
const calculateBmi = (weight: number, height: number): string => {
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

export const calcBmi = (params: BmiValues): BmiResult | unknown => {
    try {
        const { weight, height } = parseArguments(params);
        return {
            weight: weight,
            height: height,
            bmi: calculateBmi(weight, height)
        };
    } catch (error: unknown) {
        let errorMessage
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { error: errorMessage };
    }
}

export default calculateBmi