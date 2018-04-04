"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var x = { a: '' };
var y = 1;
x = y; // okay, y matches structure of x
var x1 = { data: 1 };
var y1 = { data: '' };
// 不能将类型“NotEmpty<string>”分配给类型“NotEmpty<number>”。
//   不能将类型“string”分配给类型“number”。
// x1 = y1; 
