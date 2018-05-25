/// <reference types="react" />
import * as React from 'react';
import { IEnhancedSwitchProps } from './EnhancedSwitch';
export declare type IRadioProps = IEnhancedSwitchProps;
declare class Radio extends React.Component<IRadioProps> {
    private readonly enhancedSwitchRef;
    constructor(props: IRadioProps);
    getValue(): string;
    setChecked(newCheckedValue: boolean): void;
    isChecked(): boolean;
    render(): JSX.Element;
}
export default Radio;
