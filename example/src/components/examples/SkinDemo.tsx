import * as React from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
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
            skin: props.skin,
            color: props.color,
        };
    }

    componentWillReceiveProps(nextProps: ISkinDemoProps) {
        this.setState({
            skin: nextProps.skin,
            color: nextProps.color,
        });
    }

    getCheckboxClass() {
        const {skin, color} = this.state;
        if (color) {
            return `icheckbox_${skin}-${color}`;
        }
        return `icheckbox_${skin}`;
    }

    getRadioClass() {
        const {skin, color} = this.state;
        if (color) {
            return `iradio_${skin}-${color}`;
        }
        return `iradio_${skin}`;
    }

    handleColor(color: string) {
        this.setState({color});
    }

    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <Panel>
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
                                defaultChecked
                            />
                            <br/>
                            <Checkbox
                                checkboxClass={this.getCheckboxClass()}
                                increaseArea="20%"
                                label="Checkbox, disabled"
                                disabled
                            />
                            <br/>
                            <Checkbox
                                checkboxClass={this.getCheckboxClass()}
                                increaseArea="20%"
                                label="Checkbox, defaultChecked disabled"
                                defaultChecked
                                disabled
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
                                defaultChecked
                            />
                            <br/>
                            <Radio
                                radioClass={this.getRadioClass()}
                                increaseArea="20%"
                                label="Radio, disabled"
                                disabled
                            />
                            <br/>
                            <Radio
                                radioClass={this.getRadioClass()}
                                increaseArea="20%"
                                label="Radio, defaultChecked disabled"
                                defaultChecked
                                disabled
                            />
                        </Col>
                    </Row>
                    <ColorSchemes color={this.state.color} onChange={this.handleColor.bind(this)}/>
                </Panel>

            </div>
        );
    }
}

export default SkinDemo;
