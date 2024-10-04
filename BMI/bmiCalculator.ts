import { isNotNumber } from "./utils";

interface BmiValues {
    weight: string;
    height: string;
}
interface BmiValuesParsed {
    weight: number;
    height: number;
}
interface BmiResult {
    weight: number;
    height: number;
    bmi: string;
}

interface Error {
    error: string;
}
  
const parseArguments = (params: BmiValues): BmiValuesParsed => {
    if (params.height === 'undefined') throw new Error('Parameter height missing');
    if (params.weight === 'undefined') throw new Error('Parameter weight missing');

    if (!isNotNumber(params.height) && !isNotNumber(params.weight)) {
        if (Number(params.height) === 0) throw new Error('Division by zero');
        return {
            weight: Number(params.weight),
            height: Number(params.height)
        };
    } else {
        throw new Error('malformatted parameters');
    }
};
  
const calculateBmi = (weight: number, height: number): string => {
    const bmi: number = weight / Math.pow(height/100, 2);

    switch (true) {
        case bmi < 16:
            return 'Underweight (Severe thinness)';

        case bmi < 17:
            return 'Underweight (Moderate thinness)';
        
        case bmi < 18.5:
            return 'Underweight (Mild thinness)';

        case bmi < 25:
            return 'Normal (healthy weight)';

        case bmi < 30:
            return 'Overweight (Pre-obese)';

        case bmi < 35:
            return 'Obese (Class I)';

        case bmi < 40:
            return 'Obese (Class II)';

        default:
            return 'Obese (Class III) ';
    }
};

export const calcBmi = (params: BmiValues): BmiResult | Error => {
    try {
        const { weight, height } = parseArguments(params);
        return {
            weight: weight,
            height: height,
            bmi: calculateBmi(weight, height)
        };
    } catch (error: unknown) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { error: errorMessage };
    }
};

export default calculateBmi;