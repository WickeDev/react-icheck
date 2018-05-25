import * as React from 'react'
import {Radio, IRadioProps} from './Radio'

export interface IRadioGroupProps {
  /**
   * The name that will be applied to all radio buttons inside it.
   */
  name: string

  /**
   * Sets the default radio button to be the one whose
   * value matches defaultValue (case-sensitive).
   * This will override any individual radio button with
   * the defaultChecked or checked property stated.
   */
  defaultValue?: string

  /**
   * The value of the currently selected radio button.
   */
  value?: string

  /**
   * Callback function that is fired when a radio button has
   * been clicked. Returns the event and the value of the radio
   * button that has been selected.
   */
  onChange?: (event: React.FormEvent<HTMLInputElement>, checked: string) => void

  /**
   * Should be used to pass `Radio` components.
   */
  children?: JSX.Element

  /**
   * The css class name of the root element.
   */
  className?: string

}

export interface IRadioGroupState {
  numberCheckedRadioButtons?: number
  value?: string
}

export class RadioGroup extends React.Component<IRadioGroupProps, IRadioGroupState> {

  constructor(props: IRadioGroupProps) {
    super(props)
    this.state = {
      numberCheckedRadioButtons: 0,
      value: this.props.value || this.props.defaultValue || ''
    }
  }

  componentWillMount() {
    let cnt = 0

    React.Children.forEach(this.props.children, (child: React.ReactChild) => {
      let radioButton = child as React.ReactElement<IRadioProps>
      this.hasCheckAttribute(radioButton)
    })

    this.setState({numberCheckedRadioButtons: cnt})
  }

  componentWillReceiveProps(nextProps: IRadioGroupProps) {
    if (nextProps.hasOwnProperty('value')) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  public getValue() {
    return this.state.value
  }

  public setValue(newValue: string) {
    this.updateRadioButtons(newValue)
  }

  public clearValue() {
    this.setValue('')
  }

  // noinspection JSMethodCanBeStatic
  public hasCheckAttribute(radioButton: React.ReactElement<IRadioProps>) {
    return radioButton.props.hasOwnProperty('checked') && radioButton.props.checked
  }

  public updateRadioButtons(newValue: string) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({value: newValue})
    } else {
      if (process.env.NODE_ENV !== 'production') {
        let message = 'Cannot select a different radio button while another radio button ' +
          'has the \'checked\' property set to true.'
        console.error(message) // eslint-disable-line
      }
    }
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement> /* TODO , newValue */) {
    let newValue = e.target.value

    this.updateRadioButtons(newValue)

    // Successful update
    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange) {
        this.props.onChange(e, newValue)
      }
    }
  }

  public render() {
    let options = React.Children.map(this.props.children, (child) => {
      const option = child as React.ReactElement<IRadioProps>
      const {
        name,
        value,
        label,
        ...other
      } = option.props

      // key={option.props.value.current.key}
      // ref={option.props.value}

      return (
        <Radio
          {...other}
          name={name}
          value={value}
          label={label}
          onChange={this.handleChange.bind(this)}
          checked={option.props.value === this.state.value}
        />
      )
    })

    return (
      <div className={this.props.className}>
        {options}
      </div>
    )
  }
}
