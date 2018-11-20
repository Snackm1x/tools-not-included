import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { StateType } from 'typesafe-actions';
import { History } from 'history';

import { seedBrowserReducer } from './seed-browser/reducer';

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  seedBrowser: seedBrowserReducer
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
