"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function invokeLater(args, callback) {
    /* invoke callback with 'ages' ... */
}
// unsound - invokeLater 'might' provide any number of arguments
invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
// 这种形式让人疑惑，x, y 是必须的，但却是未可知的
invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
console.log('');
