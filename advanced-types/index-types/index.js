"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function pluck(o, names) {
    return names.map(function (n) { return o[n]; });
}
var person = {
    name: 'Jarid',
    age: 35
};
var strings = pluck(person, ['name']); // ok, string[]
// let anys: any[] = pluck(person, ['name', 'age']); // ok, string[]
console.log(JSON.stringify(strings));
