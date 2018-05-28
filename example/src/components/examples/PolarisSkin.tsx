import * as React from 'react';
import {Col, Panel, Row,} from 'react-bootstrap';
import * as PanelBody from "react-bootstrap/lib/PanelBody";
import {Checkbox, Radio} from 'react-icheck';

interface IPolarisSkinProps {
    color?: string
}

interface IPolarisSkinState {
    skin?: string
    color?: string
}

class PolarisSkin extends React.Component<IPolarisSkinProps, IPolarisSkinState> {

    constructor(props: IPolarisSkinProps) {
        super(props);
        this.state = {
            color: props.color,
            skin: 'polaris',
        };
    }

    public getCheckboxClass(): string {
        const {skin, color} = this.state;
        if (color) {
            return `icheckbox_${skin}-${color}`;
        }
        return `icheckbox_${skin}`;
    }

    public getRadioClass(): string {
        const {skin, color} = this.state;
        if (color) {
            return `iradio_${skin}-${color}`;
        }
        return `iradio_${skin}`;
    }

    public render() {
        return (
            <div className="skin skin-polaris">
                <h3>Polaris skin</h3>
                <Panel>
                    <PanelBody>
                        <Row>
                            <Col md={6}>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="-10%"
                                    label="Checkbox"
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="-10%"
                                    label="Checkbox, defaultChecked"
                                    defaultChecked={true}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="-10%"
                                    label="Checkbox, disabled"
                                    disabled={true}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="-10%"
                                    label="Checkbox, defaultChecked disabled"
                                    defaultChecked={true}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={6}>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="-10%"
                                    label="Radio"
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="-10%"
                                    label="Radio, defaultChecked"
                                    defaultChecked={true}
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="-10%"
                                    label="Radio, disabled"
                                    disabled={true}
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="-10%"
                                    label="Radio, defaultChecked disabled"
                                    defaultChecked={true}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

export default PolarisSkin;
