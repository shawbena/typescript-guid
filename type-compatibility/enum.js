"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
var status = Status.Ready;
//[ts] 不能将类型“Color.Red”分配给类型“Status”。
// status = Color.Red;
var n = status;
