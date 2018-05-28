import * as React from 'react';

import {Col, Grid, Nav, Navbar, NavItem, Row,} from 'react-bootstrap';
import {Route, Switch} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import Basic from './examples/Basic';
import GettingStarted from './GettingStarted';
import PageNotFound from './PageNotFound';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Navbar inverse={true} staticTop={true} collapseOnSelect={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">React-iCheck</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/examples">
                                <NavItem>Examples</NavItem>
                            </LinkContainer>
                            <NavItem href="api" target="_blank">API</NavItem>
                            <NavItem eventKey={2} href="//github.com/luqin/react-icheck"
                                     target="_blank">GitHub</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Switch>
                                <Route path="/" component={Basic}/>
                                <Route path="getting-started" component={GettingStarted}/>
                                <Route path="examples" component={Basic}/>
                                <Route path="*" component={PageNotFound}/>
                            </Switch>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
