import { isNotNumber } from "./utils";

interface ExerciseValues {
    target: number,
    exerciseData: number[]
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let argsCount = 3;
    let exerciseData: number[] = [];
    while (args[argsCount]) {
        exerciseData.push(Number(args[argsCount]));
        argsCount++;
    }
    if (isNotNumber(args[2])) throw new Error('Provided values were not numbers!');
    if (Number(args[2]) === 0) throw new Error('Division by zero');

    exerciseData.map(day => {
        if (isNotNumber(day)) throw new Error('Provided values were not numbers!');
    })
    return {
        target: Number(args[2]),
        exerciseData: exerciseData
    }
}

const calculateExercises = (target: number, data: number[]): Result => {
    const ratingRatio: number = Math.round((data.reduce((a, b) => a + b, 0) / data.length) / target);
    let rating: number;
    switch (true) {
        case ratingRatio < 0.5:
            rating = 1;
            break;
        case ratingRatio < 1.5:
            rating = 2;
            break;
        default:
            rating = 3;
            break;
    }
    const ratingDescription: string[] = ['bad', 'not too bad but could be better', 'good'];
    return {
        periodLength: data.length,
        trainingDays: data.filter(day => day != 0).length,
        success: (data.reduce((a, b) => a + b, 0) / data.length) > target,
        rating: rating,
        ratingDescription: ratingDescription[rating-1],
        target: target,
        average: data.reduce((a, b) => a + b, 0) / data.length
    }
}

try {
    const { target, exerciseData } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, exerciseData));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}