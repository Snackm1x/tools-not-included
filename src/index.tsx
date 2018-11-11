import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as WebFont from 'webfontloader';

import './index.css';
import Root from './pages/Root';
import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

var ReactGA = require('react-ga');

WebFont.load({
  google: {
    families: ['Economica:300,400,500,700'],
  },
});

if (location.protocol !== "http:") location.protocol = "http:";

ReactGA.initialize('UA-127751254-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
//registerServiceWorker();
unregister();