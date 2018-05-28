/// <reference types="react" />
import * as React from 'react';
import { IRadioProps } from './Radio';
export interface IRadioGroupProps {
    /**
     * The name that will be applied to all radio buttons inside it.
     */
    name: string;
    /**
     * Sets the default radio button to be the one whose
     * value matches defaultValue (case-sensitive).
     * This will override any individual radio button with
     * the defaultChecked or checked property stated.
     */
    defaultValue?: string;
    /**
     * The value of the currently selected radio button.
     */
    value?: string;
    /**
     * Callback function that is fired when a radio button has
     * been clicked. Returns the event and the value of the radio
     * button that has been selected.
     */
    onChange?: (event: React.FormEvent<HTMLInputElement>, checked: string) => void;
    /**
     * Should be used to pass `Radio` components.
     */
    children?: JSX.Element[];
    /**
     * The css class name of the root element.
     */
    className?: string;
}
export interface IRadioGroupState {
    numberCheckedRadioButtons?: number;
    value?: string;
}
export declare class RadioGroup extends React.Component<IRadioGroupProps, IRadioGroupState> {
    constructor(props: IRadioGroupProps);
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: IRadioGroupProps): void;
    getValue(): string | undefined;
    setValue(newValue: string): void;
    clearValue(): void;
    hasCheckAttribute(radioButton: React.ReactElement<IRadioProps>): boolean | undefined;
    updateRadioButtons(newValue: string): void;
    private handleChange(e);
    render(): JSX.Element;
}
