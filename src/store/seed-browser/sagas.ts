import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { SeedBrowserActionTypes } from './actions'
import * as Actions from './actions'
import * as seedBrowserService from '../../api/services/seed-browser/SeedService'
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';

function* handleFetchAll(action: ActionType<typeof Actions.fetchAllRequest>) {
  try {
    const res = yield call(seedBrowserService.getAllSeeds);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.fetchListError(res.error));
    } else {
      yield put(Actions.fetchListSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.fetchListError(err.stack!))
    } else {
      yield put(Actions.fetchListError('An unknown error occured.'))
    }
  }
}

function* handleFetchFiltered(action: ActionType<typeof Actions.fetchFilteredRequest>) {
  try {
    const res = yield call(seedBrowserService.getFilteredSeeds, action.payload);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.fetchListError(res.error));
    } else {
      yield put(Actions.fetchListSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.fetchListError(err.stack!))
    } else {
      yield put(Actions.fetchListError('An unknown error occured.'))
    }
  }
}

function* handleFetchOne(action: ActionType<typeof Actions.fetchDetailsRequest>) {
  try {
    const res = yield call(seedBrowserService.getSeed, action.payload);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.fetchDetailsError(res.message));
    } else {
      yield put(Actions.fetchDetailsSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.fetchDetailsError(err.stack!))
    } else {
      yield put(Actions.fetchDetailsError('An unknown error occured.'))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(SeedBrowserActionTypes.FETCH_ALL_REQUEST, handleFetchAll);
}

function* watchFetchFilteredRequest() {
  yield takeEvery(SeedBrowserActionTypes.FETCH_FILTERED_REQUEST, handleFetchFiltered);
}

function* watchFetchOneRequest() {
  yield takeEvery(SeedBrowserActionTypes.FETCH_ONE_REQUEST, handleFetchOne);
}

function* seedBrowserSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchFilteredRequest),
    fork(watchFetchOneRequest),
  ]);
}

export default seedBrowserSaga;