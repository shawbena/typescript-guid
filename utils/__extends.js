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

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("GiK3");

var CustomTextInput = /** @class */ (function (_super) {
    __extends(CustomTextInput, _super);
    function CustomTextInput(props) {
        var _this = _super.call(this, props) || this;
        _this.focusTextInput = _this.focusTextInput.bind(_this);
        return _this;
    }
    CustomTextInput.prototype.focusTextInput = function () {
        // Explicity focus the text input using the raw DOM API
        this.textInput && this.textInput.focus();
    };
    CustomTextInput.prototype.render = function () {
        var _this = this;
        // Use the `ref` callback to store a reference to the text input DOM
        // element in an intance field (for example, this.textInput).
        return (React.createElement("div", null,
            React.createElement("input", { type: "text", ref: function (input) { _this.textInput = input; } }),
            React.createElement("input", { type: "button", value: "Focus the text input", onClick: this.focusTextInput })));
    };
    return CustomTextInput;
}(React.Component));
bootstrap_1.default(CustomTextInput);