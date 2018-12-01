import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as WebFont from 'webfontloader';
import App from './pages/App';
import configureStore from './store';
import i18n from './i18n/i18n';
import { createBrowserHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import './index.less';

WebFont.load({
  google: {
    families: ['Roboto Condensed', 'Source Sans Pro', 'Economica'],
  },
});

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App history={history} store={store} />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);
