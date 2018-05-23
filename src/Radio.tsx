import * as React from 'react'

import EnhancedSwitch, { IEnhancedSwitchProps } from './EnhancedSwitch'

export type IRadioProps = IEnhancedSwitchProps

class Radio extends React.Component<IRadioProps> {

    private enhancedSwitchRef: React.RefObject<EnhancedSwitch>

    constructor(props: IRadioProps) {
        super(props)
        this.enhancedSwitchRef = React.createRef()
    }

    public getValue(): string {
        if (!this.enhancedSwitchRef.current) return ''
        return this.enhancedSwitchRef.current.getValue()
    }

    public setChecked(newCheckedValue: boolean) {
        if (this.enhancedSwitchRef.current) {
            this.enhancedSwitchRef.current.setSwitched(newCheckedValue)
        }
    }

    public isChecked() {
        if (!this.enhancedSwitchRef.current) return false
        return this.enhancedSwitchRef.current.isSwitched()
    }

    render() {
        let enhancedSwitchProps = {
            ref: this.enhancedSwitchRef,
            inputType: 'radio',
            // labelClassName
        };

        return (
            <EnhancedSwitch {...this.props} {...enhancedSwitchProps}/>
        );
    }
}

export default Radio;
