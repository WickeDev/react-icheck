import * as React from 'react'
import classnames from 'classnames'
import * as _ from 'lodash'

const _iCheck = 'iCheck'
const _iCheckHelper = _iCheck + '-helper'

export interface IEnhancedSwitchProps {
  type?: string
  name?: string
  value?: string | string[] | number
  onMouseUp?: React.MouseEventHandler<HTMLInputElement>
  onMouseDown?: React.MouseEventHandler<HTMLInputElement>
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement>
  onTouchStart?: React.TouchEventHandler<HTMLInputElement>
  onTouchEnd?: React.TouchEventHandler<HTMLInputElement>
  id?: string
  className?: string

  // WAI-ARIA
  role?: string

  inputType?: string
  checked?: boolean
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean

  onChange?: (event: React.FormEvent<HTMLInputElement>, checked: boolean) => void
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FormEvent<HTMLInputElement>) => void

  // base class added to customized checkboxes
  checkboxClass?: string

  // base class added to customized radio buttons
  radioClass?: string

  // class added on checked state (input.checked = true)
  checkedClass?: string

  // if not empty, used instead of 'checkedClass' option (input type specific)
  checkedCheckboxClass?: string
  checkedRadioClass?: string

  // if not empty, added as class name on unchecked state (input.checked = false)
  uncheckedClass?: string

  // if not empty, used instead of 'uncheckedClass' option (input type specific)
  uncheckedCheckboxClass?: string
  uncheckedRadioClass?: string

  // class added on disabled state (input.disabled = true)
  disabledClass?: string

  // if not empty, used instead of 'disabledClass' option (input type specific)
  disabledCheckboxClass?: string
  disabledRadioClass?: string

  // if not empty, added as class name on enabled state (input.disabled = false)
  enabledClass?: string

  // if not empty, used instead of 'enabledClass' option (input type specific)
  enabledCheckboxClass?: string
  enabledRadioClass?: string

  // class added on indeterminate state (input.indeterminate = true)
  indeterminateClass?: string

  // if not empty, used instead of 'indeterminateClass' option (input type specific)
  indeterminateCheckboxClass?: string
  indeterminateRadioClass?: string

  // if not empty, added as class name on determinate state (input.indeterminate = false)
  determinateClass?: string

  // if not empty, used instead of 'determinateClass' option (input type specific)
  determinateCheckboxClass?: string
  determinateRadioClass?: string

  // class added on hover state (pointer is moved onto input)
  hoverClass?: string

  // class added on focus state (input has gained focus)
  focusClass?: string

  // class added on active state (mouse button is pressed on input)
  activeClass?: string

  // adds hoverClass to customized input on label hover and labelHoverClass to label on input hover
  labelHover?: boolean

  // class added to label if labelHover set to true
  labelHoverClass?: string

  // increase clickable area by given % (negative number to decrease)
  increaseArea?: string

  // true to set 'pointer' CSS cursor over enabled inputs and 'default' over disabled
  cursor?: boolean

  // set true to inherit original input's class name
  inheritClass?: boolean

  // if set to true, input's id is prefixed with 'iCheck-' and attached
  inheritID?: boolean

  // set true to activate ARIA support
  aria?: boolean

  // add HTML code or text inside customized input
  insert?: string

  children?: JSX.Element

  // class added for outer label
  labelClassName?: string
}

export interface IEnhancedSwitchState {
  checked?: boolean
  focused?: boolean
  hovered?: boolean
  active?: boolean
}

class EnhancedSwitch extends React.Component<IEnhancedSwitchProps, IEnhancedSwitchState> {

  static defaultProps = {

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
  }

  private _mobile: boolean
  private readonly checkboxRef: React.RefObject<HTMLInputElement>
  private readonly inputContainerRef: React.RefObject<HTMLDivElement>

  constructor(props: IEnhancedSwitchProps) {
    super(props)
    let checked = false
    if ('checked' in props) {
      checked = _.defaultTo(props.checked, false)
    } else {
      checked = _.defaultTo(props.defaultChecked, false)
    }
    // Assume we aren't on a mobile for server-side-rendering
    this._mobile = false
    this.checkboxRef = React.createRef()
    this.inputContainerRef = React.createRef()
    this.state = {
      checked,
      focused: false,
      hovered: false,
      active: false
    }
  }

  public componentDidMount() {
    if (typeof navigator !== 'undefined') {
      this._mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent)
    }
    this.adjustStyle()
    this.setIndeterminate()
    this.forceUpdate()
  }

  public componentWillReceiveProps(nextProps: IEnhancedSwitchProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked
      })
    }
  }

  public componentDidUpdate() {
    this.adjustStyle()
    this.setIndeterminate()
  }

  public getValue(): string {
    if (!this.checkboxRef.current) return ''
    return this.checkboxRef.current.value
  }

  public setSwitched(newCheckedValue: boolean) {
    this.setChecked(newCheckedValue)
  }

  public setChecked(newCheckedValue: boolean) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      // TODO: this.props.onParentShouldUpdate(newSwitchedValue)
      if (this.checkboxRef.current) {
        this.checkboxRef.current.checked = newCheckedValue
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        let message = 'Cannot call set method while checked is defined as a property.'
        console.error(message) // eslint-disable-line
      }
    }
  }

  public setIndeterminate() {
    if (this.props.indeterminate && this.checkboxRef.current) {
      this.checkboxRef.current.indeterminate = true
    }
  }

  public adjustStyle() {
    const inputContainer = this.inputContainerRef.current
    if (inputContainer) {
      const {position} = window.getComputedStyle(inputContainer)

      if (position === 'static') {
        inputContainer.style.position = 'relative'
      }
    }
  }

  public isChecked(): boolean {
    if (!this.checkboxRef.current) return false
    return this.checkboxRef.current.checked
  }

  public isSwitched() {
    if (!this.checkboxRef.current) return false
    return this.checkboxRef.current.checked
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked
    if (!('checked' in this.props)) {
      this.setState({
        checked
      })
    }

    if (this.props.onChange) {
      this.props.onChange(e, checked)
    }
  }

  private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      focused: false
    })

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  private handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      focused: true
    })

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  private handleHelperClick(event: React.MouseEvent<HTMLInputElement>) {
    if (this.props.label) {
      return
    }

    if (this.props.disabled) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    if (this.checkboxRef.current) {
      let newChecked = !this.checkboxRef.current.checked

      if (!('checked' in this.props)) {
        this.checkboxRef.current.checked = newChecked
        this.setState({
          checked: newChecked
        })
      }

      if (this.props.onChange) {
        // make sure <ins /> element is not target
        event.target = this.checkboxRef.current
        this.props.onChange(event, newChecked)
      }
    }
  }

  public render() {
    let props = this.props
    let {disabled} = props
    let {
      type,
      name,
      value,
      label,
      onBlur,
      onFocus,
      onMouseUp,
      onMouseDown,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      className,

      checkboxClass,
      increaseArea,
      inputType,
      radioClass,
      checkedClass,
      disabledClass,
      indeterminate,
      indeterminateClass,
      hoverClass,
      focusClass,
      activeClass,
      labelHover,
      labelHoverClass,
      labelClassName,
      inheritClass,
      inheritID,
      aria,
      insert,
      cursor,
      ...other
    } = props

    let {checked} = this.state

    // Setup clickable area
    let area: number = Number(('' + props.increaseArea).replace('%', '')) | 0

    // Clickable area limit
    if (area < -50) {
      area = -50
    }

    let id = props.id

    // Layer styles
    let offset = -area + '%'
    let size = 100 + (area * 2) + '%'
    let layer: React.CSSProperties = {
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
    }

    // Choose how to hide input
    let hide = {}
    if (this._mobile) {
      hide = {
        position: 'absolute',
        visibility: 'hidden'
      }
    } else if (area) {
      hide = layer
    } else {
      hide = {
        position: 'absolute',
        opacity: 0
      }
    }

    // Check ARIA option
    aria = !!props.aria

    // TODO: Set ARIA placeholder
    // let ariaID = _iCheck + '-' + Math.random().toString(36).substr(2, 6)

    let helper
    if (props.inputType === 'checkbox' && typeof props.indeterminateCheckboxClass !== 'undefined') {
      indeterminateClass = props.indeterminateCheckboxClass
    } else if (props.inputType === 'radio' && typeof props.indeterminateRadioClass !== 'undefined') {
      indeterminateClass = props.indeterminateRadioClass
    } /*else {
      throw new Error('inputType is the necessary properties')
    }*/

    const wrapProps: { className: string, id?: string, role?: string, 'aria-labelledby'?: string, 'aria-checked'?: boolean } = {
      className: classnames({
        [props.checkboxClass as string]: props.inputType === 'checkbox',
        [props.radioClass as string]: props.inputType === 'radio',
        [indeterminateClass as string]: indeterminate,
        [props.checkedClass as string]: checked,
        [props.disabledClass as string]: disabled,
        [props.hoverClass as string]: this.state.hovered,
        [props.focusClass as string]: this.state.focused,
        [props.activeClass as string]: this.state.active
      })
    }

    if (props.inheritClass) {
      wrapProps.className = classnames(wrapProps.className, props.className)
    }

    if (props.inheritID && id) {
      wrapProps.id = _iCheck + '-' + id
    }

    if (aria) {
      wrapProps.role = props.inputType
      // Set ARIA "labelledby"
      wrapProps['aria-labelledby'] = wrapProps.id
      wrapProps['aria-checked'] = checked
    }

    // Layer addition
    helper = (
      <ins
        className={_iCheckHelper}
        style={layer}
        onClick={this.handleHelperClick.bind(this)}
      />
    )

    const inputElement = (
      <input
        {...other}

        ref={this.checkboxRef}
        type={props.inputType}
        style={hide}
        name={name}
        value={value}
        defaultChecked={props.defaultChecked}
        onChange={this.handleChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onFocus={this.handleFocus.bind(this)}
      />
    )

    const insertElement = (props.insert && !React.isValidElement(props.insert)) ?
      (<div dangerouslySetInnerHTML={{__html: props.insert}}/>) : null

    const inputContainer = (
      <div ref={this.inputContainerRef} {...wrapProps}>
        {inputElement}
        {insertElement}
        {helper}
      </div>
    )

    if (!props.label) {
      return inputContainer
    }

    const labelElement = (!React.isValidElement(props.label)) ?
      (<span dangerouslySetInnerHTML={{__html: props.label}}/>) : null

    // Label events
    function handleLabelEvent(this: EnhancedSwitch, event: React.MouseEvent<HTMLLabelElement>) {
      // Do nothing if input is disabled
      if (disabled) {
        return
      }

      const etype = event.type

      // Click
      if (etype === 'click') {
        // FIXME
        // if ($(event.target).is('a')) {
        //  return
        // }
        // Hover state
      } else if (props.labelHover) {
        // mouseout|touchend false
        this.setState({
          hovered: !/ut|nd/.test(etype)
        })
      }

      if (this._mobile) {
        event.stopPropagation()
      }
      // return false
    }

    const labelProps: {
      className?: string,
      onMouseOver?: React.MouseEventHandler<HTMLLabelElement>,
      onMouseOut?: React.MouseEventHandler<HTMLLabelElement>,
      onTouchStart?: React.TouchEventHandler<HTMLLabelElement>,
      onTouchEnd?: React.TouchEventHandler<HTMLLabelElement>
    } = {
      // onClick: handleLabelEvent.bind(this),
      onMouseOver: handleLabelEvent.bind(this),
      onMouseOut: handleLabelEvent.bind(this),
      onTouchStart: handleLabelEvent.bind(this),
      onTouchEnd: handleLabelEvent.bind(this)
    }

    // add className prop for outer label
    if (labelClassName) {
      labelProps.className = labelClassName
    }

    return (
      <label {...labelProps}>
        {inputContainer}
        {labelElement}
      </label>
    )
  }
}

export default EnhancedSwitch
