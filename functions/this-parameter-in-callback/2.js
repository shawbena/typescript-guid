"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.onClickBad = function (e) {
        // this.info = e.message;
        // [ts] 类型“void”上不存在属性“info”。
        // this.info = '';
        console.log('clicked!');
    };
    return Handler;
}());
var h = new Handler();
var uiElement = {
    addClickListener: function (e) {
    }
};
uiElement.addClickListener(h.onClickBad);
