"use strict";
exports.__esModule = true;
exports["default"] = function () { };
function area(s) {
    switch (s.kind) {
        case 'square': return s.size * s.size;
        case 'rectangle': return s.height * s.width;
        case 'circle': return Math.PI * s.radius * 2;
    }
}
