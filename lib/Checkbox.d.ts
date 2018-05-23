/// <reference types="react" />
import * as React from 'react';
import { IEnhancedSwitchProps } from './EnhancedSwitch';
export declare type ICheckboxProps = IEnhancedSwitchProps;
declare class Checkbox extends React.Component<ICheckboxProps, {}> {
    private enhancedSwitchRef;
    constructor(props: ICheckboxProps);
    getValue(): string;
    setChecked(newCheckedValue: boolean): void;
    isChecked(): boolean;
    render(): JSX.Element;
}
export default Checkbox;
