import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { BrowserActionTypes } from './actions'
import { fetchRequest, fetchError, fetchSuccess } from './actions'
import * as API from '../../api/service'
import SeedListDTO from 'src/api/dto/SeedListDTO';
import Seed from 'src/types/classes/Seed';
import { ActionType } from 'typesafe-actions';

function* handleFetch(action : ActionType<typeof fetchRequest>) {
  try {
    const res = yield call(API.loadFilteredSeeds, action.payload);

//    if (res.error) {
//      yield put(fetchError(res.error));
 //   } else {

      const seeds : Seed[] = [];
      (res as SeedListDTO).seeds.forEach(element => {
          seeds.push(Seed.FromDTO(element));
      });
       
      yield put(fetchSuccess({ totalEntries: res.totalEntries, seeds: seeds}));
  //  }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(BrowserActionTypes.FETCH_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* browserSaga() {
  yield all([fork(watchFetchRequest)])
}

export default browserSaga;