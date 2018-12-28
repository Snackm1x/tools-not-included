import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { SeedBrowserActionTypes } from './actions'
import * as Actions from './actions'
import * as seedBrowserService from '../../api/services/seed-browser/SeedService'
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { GeyserType, SpaceDestinationType, GameUpgrade } from 'src/api/models';

// function* handleGetAllSeeds(action: ActionType<typeof Actions.getAllSeeds>) {
//   try {
//     const res = yield call(seedBrowserService.getAllSeeds);
//     if (res == 404) {
//       yield put(push('/404'));
//     }
//     if (res.message) {
//       yield put(Actions.getSeedListError(res.error));
//     } else {
//       yield put(Actions.getSeedListSuccess(res));
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       yield put(Actions.getSeedListError(err.stack!))
//     } else {
//       yield put(Actions.getSeedListError('An unknown error occured.'))
//     }
//   }
// }

function* handleGetFilteredSeeds(action: ActionType<typeof Actions.getFilteredSeeds>) {
  try {
    const [seedList, geyserTypes, spaceDestinationTypes, gameUpgrades] = yield all([
      call(seedBrowserService.getFilteredSeeds, action.payload),
      put(Actions.getGeyserTypes()),
      put(Actions.getSpaceDestinationTypes()),
      put(Actions.getGameUpgrades())
    ]);
    if (seedList == 404) {
      yield put(push('/404'));
    }
    if (seedList.message) {
      yield put(Actions.getSeedListError(seedList.error));
    } else {
      yield put(Actions.getSeedListSuccess(seedList));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.getSeedListError(err.stack!))
    } else {
      yield put(Actions.getSeedListError('An unknown error occured.'))
    }
  }
}

function* handleGetSeed(action: ActionType<typeof Actions.getSeed>) {
  try {
    const [seed, geyserTypes, spaceDestinationTypes, gameUpgrades] = yield all([
      call(seedBrowserService.getSeed, action.payload),
      put(Actions.getGeyserTypes()),
      put(Actions.getSpaceDestinationTypes()),
      put(Actions.getGameUpgrades())
    ]);

    if (seed == 404) {
      yield put(push('/404'));
    }
    if (seed.message) {
      yield put(Actions.getSeedError(seed.message));
    } else {
      yield put(Actions.getSeedSuccess(seed));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.getSeedError(err.stack!))
    } else {
      yield put(Actions.getSeedError('An unknown error occured.'))
    }
  }
}

function* handleGetGeyserTypes(action: ActionType<typeof Actions.getGeyserTypes>) {
  try {
    const res = yield call(seedBrowserService.getGeyserTypes);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.getSeedError(res.message));
    } else {
      var types: { [key: string]: GeyserType } = {};
      (res as GeyserType[]).forEach((geyserType) => { types[geyserType.key] = geyserType; })
      yield put(Actions.getGeyserTypesSuccess(types));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.getSeedError(err.stack!))
    } else {
      yield put(Actions.getSeedError('An unknown error occured.'))
    }
  }
}

function* handleGetSpaceDestinationTypes(action: ActionType<typeof Actions.getSpaceDestinationTypes>) {
  try {
    const res = yield call(seedBrowserService.getSpaceDestinationTypes);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.getSeedError(res.message));
    } else {
      var types: { [key: string]: SpaceDestinationType } = {};
      (res as SpaceDestinationType[]).forEach((spaceDestinationType) => { types[spaceDestinationType.key] = spaceDestinationType; })
      yield put(Actions.getSpaceDestinationTypesSuccess(types));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.getSeedError(err.stack!))
    } else {
      yield put(Actions.getSeedError('An unknown error occured.'))
    }
  }
}

function* handleGetGameUpgrades(action: ActionType<typeof Actions.getGameUpgrades>) {
  try {
    const res = yield call(seedBrowserService.getGameUpgrades);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.getSeedError(res.message));
    } else {
      var types: { [key: string]: GameUpgrade } = {};
      (res as GameUpgrade[]).forEach((gameUpgrade) => { types[gameUpgrade.key] = gameUpgrade; })
      yield put(Actions.getGameUpgradesSuccess(types));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.getSeedError(err.stack!))
    } else {
      yield put(Actions.getSeedError('An unknown error occured.'))
    }
  }
}

function* handleReportInvalidSeed(action: ActionType<typeof Actions.reportInvalidSeed>) {
  try {
    const res = yield call(seedBrowserService.reportInvalidSeed, action.payload);
    if (res == 404) {
      yield put(push('/404'));
    }
    if (res.message) {
      yield put(Actions.getSeedError(res.message));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.getSeedError(err.stack!))
    } else {
      yield put(Actions.getSeedError('An unknown error occured.'))
    }
  }
}

function* watchGetFilteredSeeds() {
  yield takeEvery(SeedBrowserActionTypes.GET_FILTERED_SEEDS, handleGetFilteredSeeds);
}

function* watchGetSeed() {
  yield takeEvery(SeedBrowserActionTypes.GET_SEED, handleGetSeed);
}

function* watchGetGeyserTypes() {
  yield takeEvery(SeedBrowserActionTypes.GET_GEYSER_TYPES, handleGetGeyserTypes);
}

function* watchGetSpaceDestinationTypes() {
  yield takeEvery(SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES, handleGetSpaceDestinationTypes);
}

function* watchGetGameUpgrades() {
  yield takeEvery(SeedBrowserActionTypes.GET_GAME_UPGRADES, handleGetGameUpgrades);
}

function* watchReportInvalidSeed() {
  yield takeEvery(SeedBrowserActionTypes.REPORT_INVALID_SEED, handleReportInvalidSeed);
}

function* seedBrowserSaga() {
  yield all([
    fork(watchGetFilteredSeeds),
    fork(watchGetSeed),
    fork(watchGetGeyserTypes),
    fork(watchGetSpaceDestinationTypes),
    fork(watchGetGameUpgrades),
    fork(watchReportInvalidSeed)
  ]);
}

export default seedBrowserSaga;