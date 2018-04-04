"use strict";
exports.__esModule = true;
function f(input) {
    var a = 100;
    if (input) {
        // Still okay to reference 'a'
        var b = a + 1;
        return b;
    }
    // Error: 'b' doesn't exist here
    // return b;
}
exports.f = f;
f(true);
