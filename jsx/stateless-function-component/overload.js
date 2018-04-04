"use strict";
exports.__esModule = true;
var React = require("react");
function MainButton(props) {
    if (isHomeProps(props)) {
        return <div>Home props.{props.home}</div>;
    }
    else {
        return <div>Side Props. {props.side}</div>;
    }
}
function isHomeProps(props) {
    return props.home !== undefined;
}
