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
var classnames_1 = __importDefault(require("classnames"));
var _ = __importStar(require("lodash"));
var _iCheck = 'iCheck';
var _iCheckHelper = _iCheck + '-helper';
var EnhancedSwitch = /** @class */ (function (_super) {
    __extends(EnhancedSwitch, _super);
    function EnhancedSwitch(props) {
        var _this = _super.call(this, props) || this;
        var checked = false;
        if ('checked' in props) {
            checked = _.defaultTo(props.checked, false);
        }
        else {
            checked = _.defaultTo(props.defaultChecked, false);
        }
        // Assume we aren't on a mobile for server-side-rendering
        _this._mobile = false;
        _this.checkboxRef = React.createRef();
        _this.inputContainerRef = React.createRef();
        _this.state = {
            checked: checked,
            focused: false,
            hovered: false,
            active: false
        };
        return _this;
    }
    EnhancedSwitch.prototype.componentDidMount = function () {
        if (typeof navigator !== 'undefined') {
            this._mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
        }
        this.adjustStyle();
        this.setIndeterminate();
        this.forceUpdate();
    };
    EnhancedSwitch.prototype.componentWillReceiveProps = function (nextProps) {
        if ('checked' in nextProps) {
            this.setState({
                checked: nextProps.checked
            });
        }
    };
    EnhancedSwitch.prototype.componentDidUpdate = function () {
        this.adjustStyle();
        this.setIndeterminate();
    };
    EnhancedSwitch.prototype.getValue = function () {
        if (!this.checkboxRef.current)
            return '';
        return this.checkboxRef.current.value;
    };
    EnhancedSwitch.prototype.setSwitched = function (newCheckedValue) {
        this.setChecked(newCheckedValue);
    };
    EnhancedSwitch.prototype.setChecked = function (newCheckedValue) {
        if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
            // TODO: this.props.onParentShouldUpdate(newSwitchedValue)
            if (this.checkboxRef.current) {
                this.checkboxRef.current.checked = newCheckedValue;
            }
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                var message = 'Cannot call set method while checked is defined as a property.';
                console.error(message); // eslint-disable-line
            }
        }
    };
    EnhancedSwitch.prototype.setIndeterminate = function () {
        if (this.props.indeterminate && this.checkboxRef.current) {
            this.checkboxRef.current.indeterminate = true;
        }
    };
    EnhancedSwitch.prototype.adjustStyle = function () {
        var inputContainer = this.inputContainerRef.current;
        if (inputContainer) {
            var position = window.getComputedStyle(inputContainer).position;
            if (position === 'static') {
                inputContainer.style.position = 'relative';
            }
        }
    };
    EnhancedSwitch.prototype.isChecked = function () {
        if (!this.checkboxRef.current)
            return false;
        return this.checkboxRef.current.checked;
    };
    EnhancedSwitch.prototype.isSwitched = function () {
        if (!this.checkboxRef.current)
            return false;
        return this.checkboxRef.current.checked;
    };
    EnhancedSwitch.prototype.handleChange = function (e) {
        var checked = e.target.checked;
        if (!('checked' in this.props)) {
            this.setState({
                checked: checked
            });
        }
        if (this.props.onChange) {
            this.props.onChange(e, checked);
        }
    };
    EnhancedSwitch.prototype.handleBlur = function (e) {
        this.setState({
            focused: false
        });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };
    EnhancedSwitch.prototype.handleFocus = function (e) {
        this.setState({
            focused: true
        });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };
    EnhancedSwitch.prototype.handleHelperClick = function (event) {
        if (this.props.label) {
            return;
        }
        if (this.props.disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.checkboxRef.current) {
            var newChecked = !this.checkboxRef.current.checked;
            if (!('checked' in this.props)) {
                this.checkboxRef.current.checked = newChecked;
                this.setState({
                    checked: newChecked
                });
            }
            if (this.props.onChange) {
                // make sure <ins /> element is not target
                event.target = this.checkboxRef.current;
                this.props.onChange(event, newChecked);
            }
        }
    };
    EnhancedSwitch.prototype.render = function () {
        var props = this.props;
        var disabled = props.disabled;
        var type = props.type, name = props.name, value = props.value, label = props.label, onBlur = props.onBlur, onFocus = props.onFocus, onMouseUp = props.onMouseUp, onMouseDown = props.onMouseDown, onMouseLeave = props.onMouseLeave, onTouchStart = props.onTouchStart, onTouchEnd = props.onTouchEnd, className = props.className, checkboxClass = props.checkboxClass, increaseArea = props.increaseArea, inputType = props.inputType, radioClass = props.radioClass, checkedClass = props.checkedClass, disabledClass = props.disabledClass, indeterminate = props.indeterminate, indeterminateClass = props.indeterminateClass, hoverClass = props.hoverClass, focusClass = props.focusClass, activeClass = props.activeClass, labelHover = props.labelHover, labelHoverClass = props.labelHoverClass, labelClassName = props.labelClassName, inheritClass = props.inheritClass, inheritID = props.inheritID, aria = props.aria, insert = props.insert, cursor = props.cursor, other = __rest(props, ["type", "name", "value", "label", "onBlur", "onFocus", "onMouseUp", "onMouseDown", "onMouseLeave", "onTouchStart", "onTouchEnd", "className", "checkboxClass", "increaseArea", "inputType", "radioClass", "checkedClass", "disabledClass", "indeterminate", "indeterminateClass", "hoverClass", "focusClass", "activeClass", "labelHover", "labelHoverClass", "labelClassName", "inheritClass", "inheritID", "aria", "insert", "cursor"]);
        var checked = this.state.checked;
        // Setup clickable area
        var area = Number(('' + props.increaseArea).replace('%', '')) | 0;
        // Clickable area limit
        if (area < -50) {
            area = -50;
        }
        var id = props.id;
        // Layer styles
        var offset = -area + '%';
        var size = 100 + (area * 2) + '%';
        var layer = {
            position: 'absolute',
            top: offset,
            left: offset,
            display: 'block',
            width: size,
            height: size,
            margin: 0,
            padding: 0,
            background: '#fff',
            border: 0,
            opacity: 0,
            cursor: disabled ? 'default' : 'pointer'
        };
        // Choose how to hide input
        var hide = {};
        if (this._mobile) {
            hide = {
                position: 'absolute',
                visibility: 'hidden'
            };
        }
        else if (area) {
            hide = layer;
        }
        else {
            hide = {
                position: 'absolute',
                opacity: 0
            };
        }
        // Check ARIA option
        aria = !!props.aria;
        // TODO: Set ARIA placeholder
        // let ariaID = _iCheck + '-' + Math.random().toString(36).substr(2, 6)
        var helper;
        if (props.inputType === 'checkbox' && typeof props.indeterminateCheckboxClass !== 'undefined') {
            indeterminateClass = props.indeterminateCheckboxClass;
        }
        else if (props.inputType === 'radio' && typeof props.indeterminateRadioClass !== 'undefined') {
            indeterminateClass = props.indeterminateRadioClass;
        } /*else {
          throw new Error('inputType is the necessary properties')
        }*/
        var wrapProps = {
            className: classnames_1.default((_a = {},
                _a[props.checkboxClass] = props.inputType === 'checkbox',
                _a[props.radioClass] = props.inputType === 'radio',
                _a[indeterminateClass] = indeterminate,
                _a[props.checkedClass] = checked,
                _a[props.disabledClass] = disabled,
                _a[props.hoverClass] = this.state.hovered,
                _a[props.focusClass] = this.state.focused,
                _a[props.activeClass] = this.state.active,
                _a))
        };
        if (props.inheritClass) {
            wrapProps.className = classnames_1.default(wrapProps.className, props.className);
        }
        if (props.inheritID && id) {
            wrapProps.id = _iCheck + '-' + id;
        }
        if (aria) {
            wrapProps.role = props.inputType;
            // Set ARIA "labelledby"
            wrapProps['aria-labelledby'] = wrapProps.id;
            wrapProps['aria-checked'] = checked;
        }
        // Layer addition
        helper = (React.createElement("ins", { className: _iCheckHelper, style: layer, onClick: this.handleHelperClick.bind(this) }));
        var inputElement = (React.createElement("input", __assign({}, other, { ref: this.checkboxRef, type: props.inputType, style: hide, name: name, value: value, defaultChecked: props.defaultChecked, onChange: this.handleChange.bind(this), onBlur: this.handleBlur.bind(this), onFocus: this.handleFocus.bind(this) })));
        var insertElement = (props.insert && !React.isValidElement(props.insert)) ?
            (React.createElement("div", { dangerouslySetInnerHTML: { __html: props.insert } })) : null;
        var inputContainer = (React.createElement("div", __assign({ ref: this.inputContainerRef }, wrapProps),
            inputElement,
            insertElement,
            helper));
        if (!props.label) {
            return inputContainer;
        }
        var labelElement = (!React.isValidElement(props.label)) ?
            (React.createElement("span", { dangerouslySetInnerHTML: { __html: props.label } })) : null;
        // Label events
        function handleLabelEvent(event) {
            // Do nothing if input is disabled
            if (disabled) {
                return;
            }
            var etype = event.type;
            // Click
            if (etype === 'click') {
                // FIXME
                // if ($(event.target).is('a')) {
                //  return
                // }
                // Hover state
            }
            else if (props.labelHover) {
                // mouseout|touchend false
                this.setState({
                    hovered: !/ut|nd/.test(etype)
                });
            }
            if (this._mobile) {
                event.stopPropagation();
            }
            // return false
        }
        var labelProps = {
            // onClick: handleLabelEvent.bind(this),
            onMouseOver: handleLabelEvent.bind(this),
            onMouseOut: handleLabelEvent.bind(this),
            onTouchStart: handleLabelEvent.bind(this),
            onTouchEnd: handleLabelEvent.bind(this)
        };
        // add className prop for outer label
        if (labelClassName) {
            labelProps.className = labelClassName;
        }
        return (React.createElement("label", __assign({}, labelProps),
            inputContainer,
            labelElement));
        var _a;
    };
    EnhancedSwitch.defaultProps = {
        checkboxClass: 'icheckbox',
        // base class added to customized radio buttons
        radioClass: 'iradio',
        // class added on checked state (input.checked = true)
        checkedClass: 'checked',
        // class added on disabled state (input.disabled = true)
        disabledClass: 'disabled',
        // class added on indeterminate state (input.indeterminate = true)
        indeterminateClass: 'indeterminate',
        // class added on hover state (pointer is moved onto input)
        hoverClass: 'hover',
        // class added on focus state (input has gained focus)
        focusClass: 'focus',
        // class added on active state (mouse button is pressed on input)
        activeClass: 'active',
        // adds hoverClass to customized input on label hover and labelHoverClass to label on input hover
        labelHover: true,
        // class added to label if labelHover set to true
        labelHoverClass: 'hover',
        // increase clickable area by given % (negative number to decrease)
        increaseArea: '',
        // true to set 'pointer' CSS cursor over enabled inputs and 'default' over disabled
        cursor: false,
        // set true to inherit original input's class name
        inheritClass: false,
        // if set to true, input's id is prefixed with 'iCheck-' and attached
        inheritID: false,
        // set true to activate ARIA support
        aria: false
    };
    return EnhancedSwitch;
}(React.Component));
exports.default = EnhancedSwitch;
