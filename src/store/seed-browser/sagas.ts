import * as Actions from './actions';
import * as seedBrowserService from '../../api/services/seed-browser/SeedService';
import { ActionType } from 'typesafe-actions';
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { GameUpgrade, GeyserType, SpaceDestinationType } from '../../api/models';
import { push } from 'connected-react-router';
import { SeedBrowserActionTypes } from './actions';

function* handleError(err: any) {
	yield put(push(`/${err.statusCode ? err.statusCode : 500}`));
	yield put(Actions.requestError(err.message));
}

function* handleGetFilteredSeeds(action: ActionType<typeof Actions.getFilteredSeeds>) {
	try {
		const [ seedList ] = yield all([
			call(seedBrowserService.getFilteredSeeds, action.payload),
			put(Actions.getGeyserTypes()),
			put(Actions.getSpaceDestinationTypes()),
			put(Actions.getGameUpgrades())
		]);
		yield put(Actions.getSeedListSuccess(seedList));
	} catch (err) {
		yield handleError(err);
	}
}

function* handleGetSeed(action: ActionType<typeof Actions.getSeed>) {
	try {
		const [ seed ] = yield all([
			call(seedBrowserService.getSeed, action.payload),
			put(Actions.getGeyserTypes()),
			put(Actions.getSpaceDestinationTypes()),
			put(Actions.getGameUpgrades())
		]);
		yield put(Actions.getSeedSuccess(seed));
	} catch (err) {
		handleError(err);
	}
}

function* handleGetGeyserTypes(action: ActionType<typeof Actions.getGeyserTypes>) {
	try {
		const res = yield call(seedBrowserService.getGeyserTypes);
		var types: { [key: string]: GeyserType } = {};
		(res as GeyserType[]).forEach((geyserType) => {
			types[geyserType.key] = geyserType;
		});
		yield put(Actions.getGeyserTypesSuccess(types));
	} catch (err) {
		handleError(err);
	}
}

function* handleGetSpaceDestinationTypes(action: ActionType<typeof Actions.getSpaceDestinationTypes>) {
	try {
		const res = yield call(seedBrowserService.getSpaceDestinationTypes);
		var types: { [key: string]: SpaceDestinationType } = {};
		(res as SpaceDestinationType[]).forEach((spaceDestinationType) => {
			types[spaceDestinationType.key] = spaceDestinationType;
		});
		yield put(Actions.getSpaceDestinationTypesSuccess(types));
	} catch (err) {
		handleError(err);
	}
}

function* handleGetGameUpgrades(action: ActionType<typeof Actions.getGameUpgrades>) {
	try {
		const res = yield call(seedBrowserService.getGameUpgrades);
		var types: { [key: string]: GameUpgrade } = {};
		(res as GameUpgrade[]).forEach((gameUpgrade) => {
			types[gameUpgrade.key] = gameUpgrade;
		});
		yield put(Actions.getGameUpgradesSuccess(types));
	} catch (err) {
		handleError(err);
	}
}

function* handleReportInvalidSeed(action: ActionType<typeof Actions.reportInvalidSeed>) {
	try {
		const res = yield call(seedBrowserService.reportInvalidSeed, action.payload);
	} catch (err) {
		handleError(err);
	}
}

function* watchGetFilteredSeeds() {
	yield takeLatest(SeedBrowserActionTypes.GET_FILTERED_SEEDS, handleGetFilteredSeeds);
}

function* watchGetSeed() {
	yield takeLatest(SeedBrowserActionTypes.GET_SEED, handleGetSeed);
}

function* watchGetGeyserTypes() {
	yield takeLatest(SeedBrowserActionTypes.GET_GEYSER_TYPES, handleGetGeyserTypes);
}

function* watchGetSpaceDestinationTypes() {
	yield takeLatest(SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES, handleGetSpaceDestinationTypes);
}

function* watchGetGameUpgrades() {
	yield takeLatest(SeedBrowserActionTypes.GET_GAME_UPGRADES, handleGetGameUpgrades);
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
