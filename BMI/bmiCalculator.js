"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcBmi = void 0;
var utils_1 = require("./utils");
var parseArguments = function (params) {
    if (params.height === 'undefined')
        throw new Error('Parameter height missing');
    if (params.weight === 'undefined')
        throw new Error('Parameter weight missing');
    if (!(0, utils_1.isNotNumber)(params.height) && !(0, utils_1.isNotNumber)(params.weight)) {
        if (Number(params.height) === 0)
            throw new Error('Division by zero');
        return {
            weight: Number(params.weight),
            height: Number(params.height)
        };
    }
    else {
        throw new Error('malformatted parameters');
    }
};
var calculateBmi = function (weight, height) {
    var bmi = weight / Math.pow(height / 100, 2);
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
var calcBmi = function (params) {
    try {
        var _a = parseArguments(params), weight = _a.weight, height = _a.height;
        return {
            weight: weight,
            height: height,
            bmi: calculateBmi(weight, height)
        };
    }
    catch (error) {
        var errorMessage = '';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { error: errorMessage };
    }
};
exports.calcBmi = calcBmi;
exports.default = calculateBmi;
