"use strict";
exports.__esModule = true;
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
exports.printLabel = printLabel;
var myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
