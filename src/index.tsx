import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as WebFont from 'webfontloader';
import App from './pages/App';
import configureStore from './store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import './index.less';

WebFont.load({
	google: {
		families: [ 'Roboto Condensed:300,400,500,700', 'Economica:300,400,500,700', 'Quicksand:700' ]
	}
});

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
	<Provider store={store}>
		<App history={history} store={store} />
	</Provider>,
	document.getElementById('root')
);
