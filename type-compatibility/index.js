"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var Person = (function () {
    function Person() {
    }
    return Person;
}());
var p;
// ok, because of structural typing
p = new Person();
var cat = p;
cat = {
    name: 'yougata'
};
p = cat;
// let x = (a: number) => 0;
// let y = (b: number, s: string) => 0;
[].forEach(function (item) { return console.log(item); });
var x;
var y;
// x = y;
// error
// 不能将类型“() => Named”分配给类型“() => Employee”。
// 不能将类型“Named”分配给类型“Employee”。
// 类型“Named”中缺少属性“location”。
// y = x; 
