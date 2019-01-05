import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { seedBrowserReducer } from './seed-browser/reducer';
import { StateType } from 'typesafe-actions';

const rootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		seedBrowser: seedBrowserReducer
	});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
