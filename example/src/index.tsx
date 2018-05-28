import './index.scss'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

const routes = (
    <Router><Route path="/" component={App}/></Router>
);

ReactDOM.render(routes, document.getElementById('app') as HTMLElement);
registerServiceWorker();
