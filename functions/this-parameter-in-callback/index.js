"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.onClickBad = function (e) {
        // this.info = e.message;
        this.info = '';
    };
    return Handler;
}());
var h = new Handler();
var uiElement = {
    addClickListener: function (e) {
    }
};
/*
类型“(this: Handler, e: Event) => void”的参数不能赋给类型“(this: void, e: Event) => void”的参数。
  每个签名的 "this" 类型不兼容。
    不能将类型“void”分配给类型“Handler”
*/
// uiElement.addClickListener(h.onClickBad); 
