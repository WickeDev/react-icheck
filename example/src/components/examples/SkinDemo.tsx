import * as React from 'react';
import {Col, Panel, Row} from 'react-bootstrap';
import * as PanelBody from "react-bootstrap/lib/PanelBody";
import {Checkbox, Radio} from 'react-icheck';
import ColorSchemes from './ColorSchemes';

interface ISkinDemoProps {
    color: string
    skin: string
    title: string
}

interface ISkinDemoState {
    skin: string
    color: string
}

class SkinDemo extends React.Component<ISkinDemoProps, ISkinDemoState> {

    constructor(props: ISkinDemoProps) {
        super(props);
        this.state = {
            color: props.color,
            skin: props.skin,
        };
    }

    public componentWillReceiveProps(nextProps: ISkinDemoProps) {
        this.setState({
            color: nextProps.color,
            skin: nextProps.skin,
        });
    }

    public getCheckboxClass() {
        const {skin, color} = this.state;
        if (color) {
            return `icheckbox_${skin}-${color}`;
        }
        return `icheckbox_${skin}`;
    }

    public getRadioClass() {
        const {skin, color} = this.state;
        if (color) {
            return `iradio_${skin}-${color}`;
        }
        return `iradio_${skin}`;
    }

    public handleColor(color: string) {
        this.setState({color});
    }

    public render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <Panel>
                    <PanelBody>
                        <Row>
                            <Col md={6}>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="20%"
                                    label="Checkbox"
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="20%"
                                    label="Checkbox, defaultChecked"
                                    defaultChecked={true}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="20%"
                                    label="Checkbox, disabled"
                                    disabled={true}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    increaseArea="20%"
                                    label="Checkbox, defaultChecked disabled"
                                    defaultChecked={true}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={6}>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="20%"
                                    label="Radio"
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="20%"
                                    label="Radio, defaultChecked"
                                    defaultChecked={true}
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="20%"
                                    label="Radio, disabled"
                                    disabled={true}
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    increaseArea="20%"
                                    label="Radio, defaultChecked disabled"
                                    defaultChecked={true}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                        <ColorSchemes color={this.state.color} onChange={this.handleColor.bind(this)}/>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

export default SkinDemo;
