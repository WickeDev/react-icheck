import * as React from 'react';
import {Col, Panel, Row} from 'react-bootstrap';
import * as PanelBody from "react-bootstrap/lib/PanelBody";
import {Checkbox, Radio} from 'react-icheck';
import ColorSchemes from './ColorSchemes';

interface ILineSkinProps {
    color?: string
}

interface ILineSkinState {
    skin: string
    color?: string
}

class LineSkin extends React.Component<ILineSkinProps, ILineSkinState> {

    constructor(props: ILineSkinProps) {
        super(props);
        this.state = {
            color: 'blue',
            skin: 'line',
        };
    }

    public componentWillReceiveProps(nextProps: ILineSkinProps) {
        this.setState({
            color: nextProps.color,
        });
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

    public handleColor(color: string) {
        this.setState({color});
    }

    public render() {
        return (
            <div>
                <h3>Line skin</h3>
                <Panel>
                    <PanelBody>
                        <Row>
                            <Col md={3}>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    insert={'<div class="icheck_line-icon"></div>Checkbox'}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    insert={<div>
                                        <div className="icheck_line-icon"/>
                                        Checkbox, defaultChecked</div>}
                                    defaultChecked={true}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    insert={'<div class="icheck_line-icon"></div>Checkbox, disabled'}
                                    disabled={true}
                                />
                                <br/>
                                <Checkbox
                                    checkboxClass={this.getCheckboxClass()}
                                    insert={'<div class="icheck_line-icon"></div>Checkbox, defaultChecked disabled'}
                                    defaultChecked={true}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={3}/>
                            <Col md={3}>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    insert={'<div class="icheck_line-icon"></div>Radio'}
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    insert={<div>
                                        <div className="icheck_line-icon"/>
                                        Radio, defaultChecked</div>}
                                    defaultChecked={true}
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    insert={'<div class="icheck_line-icon"></div>Radio, disabled'}
                                    disabled={true}
                                />
                                <br/>
                                <Radio
                                    radioClass={this.getRadioClass()}
                                    insert={'<div class="icheck_line-icon"></div>Radio, defaultChecked disabled'}
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

export default LineSkin;
