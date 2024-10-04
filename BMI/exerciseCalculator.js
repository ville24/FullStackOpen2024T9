"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcExercises = void 0;
var utils_1 = require("./utils");
var parseExerciseData = function (data) {
    if (!data.target)
        throw new Error('parameters missing');
    if (!data.daily_exercises)
        throw new Error('parameters missing');
    if ((0, utils_1.isNotNumber)(data.target) || Number(data.target) === 0)
        throw new Error('malformatted parameters');
    var count = 0;
    var exerciseData = [];
    while (data.daily_exercises[count] !== undefined) {
        if ((0, utils_1.isNotNumber)(data.daily_exercises[count]))
            throw new Error('malformatted parameters');
        exerciseData.push(Number(data.daily_exercises[count]));
        count++;
    }
    return {
        "daily_exercises": exerciseData,
        "target": Number(data.target)
    };
};
var calculateExercises = function (data) {
    var ratingRatio = Math.round((data.daily_exercises.reduce(function (a, b) { return a + b; }, 0) / data.daily_exercises.length) / data.target);
    var rating;
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
    var ratingDescription = ['bad', 'not too bad but could be better', 'good'];
    return {
        periodLength: data.daily_exercises.length,
        trainingDays: data.daily_exercises.filter(function (day) { return day != 0; }).length,
        success: (data.daily_exercises.reduce(function (a, b) { return a + b; }, 0) / data.daily_exercises.length) > data.target,
        rating: rating,
        ratingDescription: ratingDescription[rating - 1],
        target: data.target,
        average: data.daily_exercises.reduce(function (a, b) { return a + b; }, 0) / data.daily_exercises.length
    };
};
var calcExercises = function (data) {
    try {
        return calculateExercises(parseExerciseData(data));
    }
    catch (error) {
        var errorMessage = '';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { error: errorMessage };
    }
};
exports.calcExercises = calcExercises;
exports.default = exports.calcExercises;
