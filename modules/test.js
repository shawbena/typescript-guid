"use strict";
exports.__esModule = true;
var ZipCodeValidator_1 = require("./ZipCodeValidator");
var LettersOnlyValidator_1 = require("./LettersOnlyValidator");
// some samples to try
var strings = ['Hello', '98052', '101'];
// validators to use
var validators = {};
validators['ZIP code'] = new ZipCodeValidator_1.ZipCodeValidator();
validators['Letters only'] = new LettersOnlyValidator_1.LettersOnlyValidator();
// show whether each string passed each validator
strings.forEach(function (s) {
    for (var name_1 in validators) {
        console.log("\"" + s + "\" - " + validators[name_1].isAcceptable + " ? 'matches' : 'does not match' " + name_1);
    }
});
