import * as React from 'react'
import EnhancedSwitch, { IEnhancedSwitchProps } from './EnhancedSwitch'

export type ICheckboxProps = IEnhancedSwitchProps

export class Checkbox extends React.Component<ICheckboxProps, {}> {

    private readonly enhancedSwitchRef: React.RefObject<EnhancedSwitch>

    constructor(props: ICheckboxProps) {
        super(props)
        this.enhancedSwitchRef = React.createRef()
        this.state = {}
    }

    public getValue(): string {
        if (!this.enhancedSwitchRef.current) return ''
        return this.enhancedSwitchRef.current.getValue()
    }

    public setChecked(newCheckedValue: boolean) {
        if (this.enhancedSwitchRef.current) {
            this.enhancedSwitchRef.current.setChecked(newCheckedValue)
        }
    }

    public isChecked(): boolean {
       if (!this.enhancedSwitchRef.current) return false
       return this.enhancedSwitchRef.current.isChecked()
    }

    public render() {
        return (
            <EnhancedSwitch ref={this.enhancedSwitchRef} {...this.props} inputType="checkbox"/>
        )
    }
}
