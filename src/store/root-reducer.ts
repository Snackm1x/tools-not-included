import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { StateType } from 'typesafe-actions';
import { History } from 'history';

import { browserReducer } from './browser/reducer';

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  browser: browserReducer
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
