"use strict";
exports.__esModule = true;
exports["default"] = function () { };
var Handler = (function () {
    function Handler() {
        // [ts] 属性“info”没有初始化表达式，且未在构造函数中明确赋值。
        // info: string;
        this.onClickBad = function (e) {
            // this.info = '';
        };
    }
    return Handler;
}());
var h = new Handler();
var uiElement = {
    addClickListener: function (e) {
        // this.hh = '';
    }
};
uiElement.addClickListener(h.onClickBad);
