const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow(height/100, 2);
    console.log(bmi)

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

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));