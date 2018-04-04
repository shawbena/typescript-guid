"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var EventType;
(function (EventType) {
    EventType[EventType["Mouse"] = 0] = "Mouse";
    EventType[EventType["Keyboard"] = 1] = "Keyboard";
})(EventType || (EventType = {}));
function listenEvent(eventType, handler) {
    //...
}
// Unsound, but useful and common
listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ', ' + e.y); });
//
listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
/*
类型“(e: number) => void”的参数不能赋给类型“(e: Event) => void”的参数。
  参数“e”和“e” 的类型不兼容。
    不能将类型“Event”分配给类型“number”。
*/
// listenEvent(EventType.Mouse, (e: number) => console.log(e));
var e = { timestamp: new Date().valueOf() };
var m = {
    timestamp: new Date().valueOf(),
    x: 100,
    y: 50
};
var e2 = m;
/*
  不能将类型“Event”分配给类型“MouseEvent”。
  类型“Event”中缺少属性“x”。
*/
// let m2: MouseEvent = e; 
