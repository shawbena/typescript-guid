var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var Button = function (props) {
    var kind = props.kind, other = __rest(props, ["kind"]);
    var className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';
    return React.createElement("button", __assign({ className: className }, other));
};
var App = function () {
    return (React.createElement("div", null,
        React.createElement(Button, { kind: "primary", onClick: function () { return console.log('clicked!'); } }, "Hello world!")));
};
var div = document.createElement('div');
document.body.appendChild(div);
react_dom_1.render(React.createElement(App, null), div);