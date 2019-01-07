import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import seedBrowserSaga from './seed-browser/sagas';
import { Action, AnyAction, applyMiddleware, createStore, Dispatch, Store } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { SeedBrowserState } from './seed-browser/reducer';

export interface ApplicationState {
	seedBrowser: SeedBrowserState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
	dispatch: Dispatch<A>;
}

export function* rootSaga() {
	yield all([ fork(seedBrowserSaga) ]);
}

export default function configureStore(
	history: History,
	initialState?: ApplicationState
): Store<ApplicationState, Action> {
	const composeEnhancers = composeWithDevTools({});
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		rootReducer(history),
		initialState,
		composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
	);

	sagaMiddleware.run(rootSaga);

	return store;
}
