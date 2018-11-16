
import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { History } from 'history'

// Import the state interface and our combined reducers/sagas.
import { ApplicationState, rootSaga } from '.'
import rootReducer from './root-reducer';
import { RootAction } from './root-action';

export default function configureStore(history: History, initialState?: ApplicationState): Store<ApplicationState, RootAction> {

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer(history), initialState, composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  return store;
}