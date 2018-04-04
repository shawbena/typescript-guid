"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var s = 'foo';
// s = null; // error, 'null' is not assgnable to 'string'
var sn = 'bar';
sn = null; // ok
// sn = undefined; // error, 'undefined' is not assignable to 'string | null' 
