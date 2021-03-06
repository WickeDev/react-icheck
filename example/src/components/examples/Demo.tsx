import * as React from 'react';
import {Col, Panel, Row} from 'react-bootstrap';
import * as PanelBody from "react-bootstrap/lib/PanelBody";
import {Checkbox, Radio, RadioGroup} from 'react-icheck';

interface IDemoState {
    i1checked: boolean
    i2disabled: boolean
    i3checked: boolean
    i4disabled: boolean
    radioValue: string
}

class Demo extends React.Component<{}, IDemoState> {

    public static defaultProps = {};

    constructor(props: {}) {
        super(props);
        this.state = {
            i1checked: false,
            i2disabled: false,
            i3checked: false,
            i4disabled: false,
            radioValue: '3',
        };

        this.handle1 = this.handle1.bind(this);
        this.handle2 = this.handle2.bind(this);
        this.handle3 = this.handle3.bind(this);
        this.handle4 = this.handle4.bind(this);
        this.handle1Change = this.handle1Change.bind(this);
        this.handle3Change = this.handle3Change.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    public handle1() {
        this.setState({
            i1checked: true,
            i3checked: true,
            radioValue: '3',
        });
    }

    public handle2() {
        this.setState({
            i1checked: false,
            i3checked: false,
            radioValue: this.state.radioValue === '3' ? '' : this.state.radioValue,
        });
    }

    public handle3() {
        this.setState({
            i2disabled: true,
            i4disabled: true,
        });
    }

    public handle4() {
        this.setState({
            i2disabled: false,
            i4disabled: false,
        });
    }

    public handle1Change(e: any, checked: boolean) {
        this.setState({
            i1checked: checked,
        });
    }

    public handle3Change(e: any, checked: boolean) {
        this.setState({
            i3checked: checked,
        });
    }

    public handleRadioChange(event: React.FormEvent<HTMLInputElement>, value: string) {
        this.setState({
            radioValue: value,
        });
    }

    public render() {
        return (
            <div className="demo">
                <h2>DEMO</h2>
                <Panel>
                    <PanelBody>
                        <Row>
                            <Col md={6}>
                                <Checkbox
                                    checkboxClass="icheckbox_square-blue"
                                    increaseArea="20%"
                                    label="Checkbox, <span class='label1'>#input-1</span>"
                                    checked={this.state.i1checked}
                                    onChange={this.handle1Change}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass="icheckbox_square-blue"
                                    increaseArea="20%"
                                    label="Checkbox, <span class='label1'>#input-2</span>"
                                    defaultChecked={true}
                                    disabled={this.state.i2disabled}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass="icheckbox_square-blue"
                                    increaseArea="20%"
                                    label="Checkbox, <span class='label1'>#disabled</span>"
                                    disabled={true}
                                />
                            </Col>
                            <Col md={3}>
                                <RadioGroup name="radio" value={this.state.radioValue}
                                            onChange={this.handleRadioChange}>
                                    <Radio
                                        value="3"
                                        radioClass="iradio_square-blue"
                                        increaseArea="20%"
                                        label="Radio, <span class='label1'>#input-3</span>"
                                    />
                                    <Radio
                                        value="4"
                                        radioClass="iradio_square-blue"
                                        increaseArea="20%"
                                        label="Radio, <span class='label1'>#input-4</span>"
                                        disabled={this.state.i4disabled}
                                    />
                                    <Radio
                                        value="5"
                                        radioClass="iradio_square-blue"
                                        increaseArea="20%"
                                        label="Radio, <span class='label1'>#disabled</span>"
                                        disabled={true}
                                    />
                                </RadioGroup>
                            </Col>
                        </Row>

                        <dl className="demo-methods">
                            <dt onClick={this.handle1}>
                                <span className="self do-check">Add <span className="mark">checked</span> state to 1 and 3 inputs</span>
                            </dt>
                            <dt onClick={this.handle2}>
                                <span className="self do-uncheck">Remove <span className="mark">checked</span> state from 1 and 3 inputs</span>
                            </dt>
                            <dt onClick={this.handle3}>
                                <span className="self do-disable">Add <span className="mark">disabled</span> state to 2 and 4 inputs</span>
                            </dt>
                            <dt onClick={this.handle4}>
                                <span className="self do-enable">Remove <span className="mark">disabled</span> state from 2 and 4 inputs</span>
                            </dt>
                        </dl>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

export default Demo;
