import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as WebFont from 'webfontloader';


import './index.css';
import Root from './pages/Root';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
    google: {
      families: ['Economica:300,400,500,700'],
    },
  });

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();