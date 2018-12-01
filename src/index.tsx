import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './pages/App';
import configureStore from './store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import './index.less';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

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
