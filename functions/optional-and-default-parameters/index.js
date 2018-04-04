"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function buildName(firstName, lastName) {
    return firstName + ' ' + lastName;
}
// [ts] 应有 2 个参数，但获得 1 个。
// let result1 = buildName('Bob');
//[ts] 应有 2 个参数，但获得 3 个。
// let result2 = buildName('Bob', 'Adams', 'Sr.');
// ah, just right
var result3 = buildName('Bob', 'Adams');
