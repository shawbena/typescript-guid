"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BasicCalculator_1 = require("./BasicCalculator");
var ScientificCalcalutor = (function (_super) {
    __extends(ScientificCalcalutor, _super);
    function ScientificCalcalutor(value) {
        if (value === void 0) { value = 0; }
        return _super.call(this, value) || this;
    }
    ScientificCalcalutor.prototype.sin = function () {
        this.value = Math.sin(this.value);
        return this;
    };
    return ScientificCalcalutor;
}(BasicCalculator_1["default"]));
var v = new ScientificCalcalutor(2)
    .multiply(5)
    .sin()
    .add(1)
    .currentValue();
// let b = new BasicCalculator(5); 
