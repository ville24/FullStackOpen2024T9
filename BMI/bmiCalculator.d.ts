interface BmiValues {
    weight: string;
    height: string;
}
interface BmiResult {
    weight: number;
    height: number;
    bmi: string;
}
interface Error {
    error: string;
}
declare const calculateBmi: (weight: number, height: number) => string;
export declare const calcBmi: (params: BmiValues) => BmiResult | Error;
export default calculateBmi;
