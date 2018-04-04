"use strict";
exports.__esModule = true;
var React = require("react");
function ComponentFoo(props) {
    return <AnotherComponent name={props.name}/>;
}
// why?
var a = <ComponentFoo name={"hh"} X={1} Y={2}/>;
var Button = function (props, context) { return <button />; };
