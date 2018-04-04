"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function getName(n) {
    // (parameter) n: string | (() => string)
    if (typeof n === 'string') {
        // (parameter) n: string
        return n;
    }
    // (parameter) n: () => string
    return n();
}
