interface ExerciseValues {
    target: number;
    daily_exercises: number[];
}
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
interface Error {
    error: string;
}
export declare const calcExercises: (data: ExerciseValues) => Result | Error;
export default calcExercises;
