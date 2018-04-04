"use strict";
exports.__esModule = true;
exports["default"] = function () { };
// 使用接口以执行类型检查
function fn(x) {
    return 1;
}
var x = {
    diff: function (a) {
        return Number(a);
    }
};
// fn(x.diff); 
