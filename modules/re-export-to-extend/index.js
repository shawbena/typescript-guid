"use strict";
exports.__esModule = true;
var Calculator_1 = require("./Calculator");
var ProgrammerCalculator_1 = require("./ProgrammerCalculator");
var c = new Calculator_1.Calculator();
Calculator_1.test(c, '1+2*33/11=');
var pc = new ProgrammerCalculator_1.Calculator(2);
ProgrammerCalculator_1.test(pc, '001+010=');
