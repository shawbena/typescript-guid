"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var C = (function () {
    function C() {
        this.p = 12;
    }
    C.prototype.m = function () { };
    return C;
}());
exports["default"] = C;
var c = new C();
var clone = __assign({}, c);
clone.p;
// clone.m();
var defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' };
var search = __assign({}, defaults, { food: 'rich' });
var search2 = __assign({}, defaults);
var arrs = [1, 2];
var arr = arrs.concat(['4', 'five', 6]);
