"use strict";
exports.__esModule = true;
var MyComponent = (function () {
    function MyComponent() {
    }
    MyComponent.prototype.render = function () {
    };
    return MyComponent;
}());
// use a contruct signature
var myComponent = new MyComponent();
// element class type => MyComponent
// element instance type => { render: () => void }
function MyFactoryFunction() {
    return {
        render: function () {
        }
    };
}
// use a call signatrue
var myComponent2 = MyFactoryFunction();
// element class type => FactoryFunction
// element instance type => { render: () => void} 
