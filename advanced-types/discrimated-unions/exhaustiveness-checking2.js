"use strict";
exports.__esModule = true;
var assert_never_1 = require("../../utils/assert-never");
function area(s) {
    switch (s.kind) {
        case 'square': return s.size * s.size;
        case 'rectangle': return s.height * s.width;
        case 'circle': return Math.PI * s.radius * 2;
        case 'triangle': return s.sideA * s.sideB / 2;
        // recommended
        default: return assert_never_1["default"](s);
    }
}
