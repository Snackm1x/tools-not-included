import { BrowserState } from './browser'
import { all, fork } from 'redux-saga/effects'
import browserSaga from './browser/sagas'
import { Dispatch, Action, AnyAction } from 'redux';

export interface ApplicationState {
  browser: BrowserState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
	dispatch: Dispatch<A>;
}

export function* rootSaga() {
  yield all([
    fork(browserSaga)
  ])
}