import { isNotNumber } from "./utils";

interface ExerciseValues {
    target: number,
    daily_exercises: number[]
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

interface Error {
    error: string;
}

const parseExerciseData = (data: ExerciseValues): ExerciseValues => {
    if (!data.target) throw new Error('parameters missing');
    if (!data.daily_exercises) throw new Error('parameters missing');

    if (isNotNumber(data.target) || Number(data.target) === 0) throw new Error('malformatted parameters');

    let count: number = 0;
    const exerciseData: number[] = [];
    while (data.daily_exercises[count] !== undefined) {
        if (isNotNumber(data.daily_exercises[count])) throw new Error('malformatted parameters');
        exerciseData.push(Number(data.daily_exercises[count]));
        count++;
    }

    return {
        "daily_exercises": exerciseData,
        "target": Number(data.target)
    };
};

const calculateExercises = (data: ExerciseValues): Result => {
    const ratingRatio: number = Math.round((data.daily_exercises.reduce((a, b) => a + b, 0) / data.daily_exercises.length) / data.target);
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
        periodLength: data.daily_exercises.length,
        trainingDays: data.daily_exercises.filter(day => day != 0).length,
        success: (data.daily_exercises.reduce((a, b) => a + b, 0) / data.daily_exercises.length) > data.target,
        rating: rating,
        ratingDescription: ratingDescription[rating-1],
        target: data.target,
        average: data.daily_exercises.reduce((a, b) => a + b, 0) / data.daily_exercises.length
    };
};
export const calcExercises = (data: ExerciseValues): Result | Error => {
    try {
        return calculateExercises(parseExerciseData(data));
    } catch (error: unknown) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { error: errorMessage };
    }
};

export default calcExercises;