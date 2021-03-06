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
var EnhancedSwitch_1 = __importDefault(require("./EnhancedSwitch"));
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(props) {
        var _this = _super.call(this, props) || this;
        _this.enhancedSwitchRef = React.createRef();
        _this.state = {};
        return _this;
    }
    Checkbox.prototype.getValue = function () {
        if (!this.enhancedSwitchRef.current)
            return '';
        return this.enhancedSwitchRef.current.getValue();
    };
    Checkbox.prototype.setChecked = function (newCheckedValue) {
        if (this.enhancedSwitchRef.current) {
            this.enhancedSwitchRef.current.setChecked(newCheckedValue);
        }
    };
    Checkbox.prototype.isChecked = function () {
        if (!this.enhancedSwitchRef.current)
            return false;
        return this.enhancedSwitchRef.current.isChecked();
    };
    Checkbox.prototype.render = function () {
        return (React.createElement(EnhancedSwitch_1.default, __assign({ ref: this.enhancedSwitchRef }, this.props, { inputType: "checkbox" })));
    };
    return Checkbox;
}(React.Component));
exports.Checkbox = Checkbox;
