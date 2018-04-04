"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = "Smith"; }
    return firstName + " " + lastName;
}
// correctly now, returns "Bob Smith"
var result1 = buildName("Bob");
// still works, also returns "Bob Smith"
var result2 = buildName("Bob", undefined);
// let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
// ah, just right
var result4 = buildName("Bob", "Adams");
