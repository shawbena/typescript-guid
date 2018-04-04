"use strict";
exports.__esModule = true;
var React = require("react");
var react_dom_1 = require("react-dom");
var hello_1 = require("./hello");
var div = document.createElement('div');
document.body.appendChild(div);
react_dom_1.render(<hello_1.Hello compiler="TypeScript" framework="React"/>, div);
