import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { StateType } from 'typesafe-actions';
import { History } from 'history';


const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history)
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;