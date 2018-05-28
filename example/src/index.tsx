import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Route} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './components/App';
import GettingStarted from './components/GettingStarted';
import PageNotFound from './components/PageNotFound';
import Basic from './components/examples/Basic';
import registerServiceWorker from './registerServiceWorker';
import './index.scss'

const routes = (
    <Router>
        <Route path="/" component={App}>
            <Route path="/" component={Basic}/>
            <Route path="getting-started" component={GettingStarted}/>
            <Route path="examples" component={Basic}/>
            <Route path="*" component={PageNotFound}/>
        </Route>
    </Router>
);

ReactDOM.render(routes, document.querySelector('#app'));
registerServiceWorker();
