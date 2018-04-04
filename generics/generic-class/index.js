"use strict";
exports.__esModule = true;
var GenericNumber = (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
exports.GenericNumber = GenericNumber;
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
var stringNumberic = new GenericNumber();
stringNumberic.zeroValue = '';
stringNumberic.add = function (x, y) { return x + y; };
