"use strict";
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.clone = function (animal) {
        // throw new Error("Method not implemented."); 
        return new Animal();
    };
    return Test;
}());
// new Test().clone() // 有4个重载
