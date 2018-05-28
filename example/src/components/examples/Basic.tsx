import './style.scss';

import * as React from 'react';
import {PageHeader} from 'react-bootstrap';
import Demo from './Demo';
import FuturicoSkin from './FuturicoSkin';
import LineSkin from './LineSkin';
import PolarisSkin from './PolarisSkin';
import SkinDemo from './SkinDemo';

class Basic extends React.Component {

    public static defaultProps = {};

    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div>
                <PageHeader>Examples</PageHeader>
                <Demo/>
                <br/>
                <SkinDemo title="Minimal skin" skin="minimal" color=""/>
                <SkinDemo title="Square skin" skin="square" color="green"/>
                <SkinDemo title="Flat skin" skin="flat" color="red"/>
                <LineSkin/>
                <PolarisSkin/>
                <FuturicoSkin/>
                <br/>
            </div>
        );
    }
}

export default Basic;
