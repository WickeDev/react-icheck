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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Radio_1 = __importDefault(require("./Radio"));
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            numberCheckedRadioButtons: 0,
            value: _this.props.value || _this.props.defaultValue || ''
        };
        return _this;
    }
    RadioGroup.prototype.componentWillMount = function () {
        var _this = this;
        var cnt = 0;
        React.Children.forEach(this.props.children, function (child) {
            var radioButton = child;
            _this.hasCheckAttribute(radioButton);
        });
        this.setState({ numberCheckedRadioButtons: cnt });
    };
    RadioGroup.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.hasOwnProperty('value')) {
            this.setState({
                value: nextProps.value
            });
        }
    };
    RadioGroup.prototype.getValue = function () {
        return this.state.value;
    };
    RadioGroup.prototype.setValue = function (newValue) {
        this.updateRadioButtons(newValue);
    };
    RadioGroup.prototype.clearValue = function () {
        this.setValue('');
    };
    // noinspection JSMethodCanBeStatic
    RadioGroup.prototype.hasCheckAttribute = function (radioButton) {
        return radioButton.props.hasOwnProperty('checked') && radioButton.props.checked;
    };
    RadioGroup.prototype.updateRadioButtons = function (newValue) {
        if (this.state.numberCheckedRadioButtons === 0) {
            this.setState({ value: newValue });
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                var message = 'Cannot select a different radio button while another radio button ' +
                    'has the \'checked\' property set to true.';
                console.error(message); // eslint-disable-line
            }
        }
    };
    RadioGroup.prototype.handleChange = function (e /* TODO , newValue */) {
        var newValue = e.target.value;
        this.updateRadioButtons(newValue);
        // Successful update
        if (this.state.numberCheckedRadioButtons === 0) {
            if (this.props.onChange) {
                this.props.onChange(e, newValue);
            }
        }
    };
    RadioGroup.prototype.render = function () {
        var _this = this;
        var options = React.Children.map(this.props.children, function (child) {
            var option = child;
            var _a = option.props, name = _a.name, value = _a.value, label = _a.label, other = __rest(_a, ["name", "value", "label"]);
            // key={option.props.value.current.key}
            // ref={option.props.value}
            return (React.createElement(Radio_1.default, __assign({}, other, { name: name, value: value, label: label, onChange: _this.handleChange.bind(_this), checked: option.props.value === _this.state.value })));
        });
        return (React.createElement("div", { className: this.props.className }, options));
    };
    return RadioGroup;
}(React.Component));
exports.default = RadioGroup;
