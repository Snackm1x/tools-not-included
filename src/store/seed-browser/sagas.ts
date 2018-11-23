import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { SeedBrowserActionTypes } from './actions'
import * as Actions from './actions'
import * as API from '../../services/SeedBrowserService'
import SeedListDTO from '../../services/api/dto/SeedListDTO';
import Seed from 'src/types/classes/Seed';
import { ActionType } from 'typesafe-actions';
import { push } from 'react-router-redux';

function* handleFetchAll(action: ActionType<typeof Actions.fetchAllRequest>) {
  try {
    const res = yield call(API.loadAllSeeds);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.fetchListError(res.error));
    } else {
      const seeds: Seed[] = [];
      (res as SeedListDTO).seeds.forEach(element => {
        seeds.push(Seed.FromDTO(element));
      });

      yield put(Actions.fetchListSuccess({ totalEntries: res.totalEntries, seeds: seeds }));
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
    const res = yield call(API.loadFilteredSeeds, action.payload);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.fetchListError(res.error));
    } else {
      const seeds: Seed[] = [];
      (res as SeedListDTO).seeds.forEach(element => {
        seeds.push(Seed.FromDTO(element));
      });

      yield put(Actions.fetchListSuccess({ totalEntries: res.totalEntries, seeds: seeds }));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.fetchListError(err.stack!))
    } else {
      yield put(Actions.fetchListError('An unknown error occured.'))
    }
  }
}

function* handleFetchDetails(action: ActionType<typeof Actions.fetchDetailsRequest>) {
  try {
    const res = yield call(API.loadSeedDetails, action.payload);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.fetchDetailsError(res.message));
    } else {
      yield put(Actions.fetchDetailsSuccess(Seed.FromDTO(res)));
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

function* watchFetchDetailsRequest() {
  yield takeEvery(SeedBrowserActionTypes.FETCH_DETAILS_REQUEST, handleFetchDetails);
}

function* seedBrowserSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchFilteredRequest),
    fork(watchFetchDetailsRequest),
  ]);
}

export default seedBrowserSaga;