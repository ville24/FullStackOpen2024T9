"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator");
var exerciseCalculator_1 = require("./exerciseCalculator");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
app.get('/bmi', function (req, res) {
    var weight = String(req.query.weight);
    var height = String(req.query.height);
    res.send((0, bmiCalculator_1.calcBmi)({ weight: weight, height: height }));
});
app.post('/exercises', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.json((0, exerciseCalculator_1.calcExercises)({ target: req.body.target, daily_exercises: req.body.daily_exercises }));
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
