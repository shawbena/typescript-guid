"use strict";
exports.__esModule = true;
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
exports.printLabel = printLabel;
var myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
//类型“{ label: string; size: string; }”的参数不能赋给类型“{ label: string; }”的参数。
// 对象文字可以只指定已知属性，并且“size”不在类型“{ label: string; }”中。
// printLabel({ label: 'hh', size: 'cc'}) 
