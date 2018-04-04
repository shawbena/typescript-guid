"use strict";
exports.__esModule = true;
exports["default"] = function () { };
//function f(x: number, y?: number | undefined): number
function f(x, y) {
    return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
// f(1, null); // error, 'null' is not assignable to 'number | undefined' 
