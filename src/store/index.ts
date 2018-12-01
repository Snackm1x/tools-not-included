import { all, fork } from 'redux-saga/effects'
import { Dispatch, Action, AnyAction, Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { History } from 'history'

import rootReducer from './root-reducer';
import { SeedBrowserState } from './seed-browser/reducer';
import seedBrowserSaga from './seed-browser/sagas';


export interface ApplicationState {
  seedBrowser: SeedBrowserState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export function* rootSaga() {
  yield all([
    fork(seedBrowserSaga)
  ])
}

export default function configureStore(history: History, initialState?: ApplicationState): Store<ApplicationState, Action> {

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer(history), initialState, composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  return store;
}