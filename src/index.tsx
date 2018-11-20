import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as WebFont from 'webfontloader';

import './index.css';
import Root from './pages/Root';
import { unregister } from './registerServiceWorker';
import  configureStore from './store';

import { createBrowserHistory} from 'history'

var ReactGA = require('react-ga');

WebFont.load({
  google: {
    families: ['Economica:300,400,500,700'],
  },
});

if (location.protocol !== "http:") location.protocol = "http:";

unregister();
ReactGA.initialize('UA-127751254-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
    <Root store={store} history={history}/>,
  document.getElementById('root') as HTMLElement);