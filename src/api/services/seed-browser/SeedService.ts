import API from '../../../api/api';
import {
	AddInvalidSeedReportRequest,
	ErrorDetails,
	GameUpgrade,
	GeyserType,
	Seed,
	SeedBrowserFilter,
	SeedList,
	SpaceDestinationType,
	ElementBasicInfo
} from '../../../api/models';
import { SeedBrowserFilterFormValues } from '../../../pages/seeds/browser/components/SeedBrowserFilterForm';
import { SeedDetailsRequestModel } from '../../../api/request-models';

const BrowserFilterKey = 'seedbrowser-filter';
const BrowserShowNonPresetKey = 'seedbrowser-shownonpresent';
const BrowserFilterPageSizeKey = 'seedbrowser-filter-pagesize';
const BrowserFilterPageKey = 'seedbrowser-filter-page';
const BrowserGameUpgradesCacheKey = 'seedbrowser-cache-game-upgrades';
const BrowserGeyserTypesCacheKey = 'seedbrowser-cache-geyser-types';
const BrowserSpaceDestinationTypesCacheKey = 'seedbrowser-cache-space-types';
const BrowserElementBasicInfoCacheKey = 'seedbrowser-element-basic-info';

export function getFilteredSeeds(filter: SeedBrowserFilter) {
	return API.post<SeedList>('/seeds/filtered', filter, { headers: { Accept: 'application/json' } })
		.then((res) => res.data)
		.catch((error) => handleError(error));
}

export function getSeed(request: SeedDetailsRequestModel) {
	var url = '/seeds/' + request.seedNumber;
	if (request.gameVersion != undefined) url += '/' + request.gameVersion;
	return API.get<Seed>(url, { headers: { Accept: 'application/json' } })
		.then((res) => res.data)
		.catch((error) => handleError(error));
}

export function getGeyserTypes() {
	var fromCache = loadCacheGeyserTypes();
	if (fromCache !== null) return fromCache;

	var url = '/geysers/types';
	return API.get<GeyserType[]>(url)
		.then((res) => {
			saveCacheGeyserTypes(res.data);
			return res.data;
		})
		.catch((error) => handleError(error));
}

export function getSpaceDestinationTypes() {
	var fromCache = loadCacheSpaceTypes();
	if (fromCache !== null) return fromCache;

	var url = '/spacedestinations/types';
	return API.get<SpaceDestinationType[]>(url)
		.then((res) => {
			saveCacheSpaceTypes(res.data);
			return res.data;
		})
		.catch((error) => handleError(error));
}

export function getGameUpgrades() {
	var fromCache = loadCacheGameUpgrades();
	if (fromCache !== null) return fromCache;

	var url = '/gameupgrades';
	return API.get<GameUpgrade[]>(url)
		.then((res) => {
			saveCacheGameUpgrades(res.data);
			return res.data;
		})
		.catch((error) => handleError(error));
}

export function getElementBasicInfo() {
	var fromCache = loadElementBasicInfoFromSessionStorage();
	if (fromCache != null) return fromCache;
	
	var url = '/elements/basic';
	return API.get<{[key: string]: ElementBasicInfo}>(url)
		.then((res) => {
			console.log("then")
			saveElementBasicInfoToSessionStorage(res.data);
			return res.data;
		})
		.catch((error) => handleError(error));
}

export function reportInvalidSeed(request: AddInvalidSeedReportRequest) {
	var url = '/seeds/reportInvalid';
	return API.post(url, request, { headers: { Accept: 'application/json' } })
		.then((res) => res.data)
		.catch((error) => handleError(error));
}

/**
 *  Local storage
 */
export function saveElementBasicInfoToSessionStorage(values: {[key: string]: ElementBasicInfo}) {
	if (storageAvailable('sessionStorage')) {
		const json = JSON.stringify(values);
		sessionStorage.setItem(BrowserElementBasicInfoCacheKey, json);
	}
}

export function loadElementBasicInfoFromSessionStorage(): {[key: string]: ElementBasicInfo} | null{
	var elements: string | null = null;

	if (storageAvailable('sessionStorage')) {
		elements = sessionStorage.getItem(BrowserElementBasicInfoCacheKey);
	}

	if (elements != null) {
		return JSON.parse(elements);
	}

	return null;
}

export function saveFilterFormValuesToLocalStorage(values: SeedBrowserFilterFormValues) {
	if (storageAvailable('localStorage')) {
		const json = JSON.stringify(values);
		localStorage.setItem(BrowserFilterKey, json);
	}
}

export function loadFilterFormValuesFromLocalStorage(): SeedBrowserFilterFormValues {
	var filter: string | null = null;

	if (storageAvailable('localStorage')) {
		filter = localStorage.getItem(BrowserFilterKey);
	}

	if (filter != null) {
		return JSON.parse(filter);
	}

	return { rules: [] };
}

export function saveDetailsShowNonPresentToLocalStorage(show: boolean) {
	if (storageAvailable('localStorage')) {
		const json = JSON.stringify(show);
		localStorage.setItem(BrowserShowNonPresetKey, json);
	}
}

export function loadDetailsShowNonPresentFromLocalStorage(): boolean {
	if (storageAvailable('localStorage')) {
		var show: string | null = null;
		show = localStorage.getItem(BrowserShowNonPresetKey);
		return show === 'true';
	}

	return false;
}

export function saveFilterPageSizeToLocalStorage(pageSize: number) {
	if (storageAvailable('localStorage')) {
		const json = JSON.stringify(pageSize);
		localStorage.setItem(BrowserFilterPageSizeKey, json);
	}
}

export function loadFilterPageSizeFromLocalStorage(): number {
	if (storageAvailable('localStorage')) {
		var pageSize: string | null = null;
		pageSize = localStorage.getItem(BrowserFilterPageSizeKey);
		return pageSize ? parseInt(pageSize) : 20;
	} else {
		return 20;
	}
}

export function saveFilterPageToSessionStorage(pageSize: number) {
	if (storageAvailable('sessionStorage')) {
		const json = JSON.stringify(pageSize);
		sessionStorage.setItem(BrowserFilterPageKey, json);
	}
}

export function loadFilterPageFromSessionStorage(): number {
	if (storageAvailable('sessionStorage')) {
		var page: string | null = null;
		page = sessionStorage.getItem(BrowserFilterPageSizeKey);
		return page ? parseInt(page) : 1;
	} else {
		return 1;
	}
}

export function saveCacheGeyserTypes(types: GeyserType[]) {
	if (storageAvailable('sessionStorage')) {
		const json = JSON.stringify(types);
		sessionStorage.setItem(BrowserGeyserTypesCacheKey, json);
	}
}

export function loadCacheGeyserTypes(): GeyserType[] | null {
	var geyserTypes: string | null = null;

	if (storageAvailable('sessionStorage')) {
		geyserTypes = sessionStorage.getItem(BrowserGeyserTypesCacheKey);
	}

	if (geyserTypes != null) {
		return JSON.parse(geyserTypes);
	}

	return null;
}

export function saveCacheSpaceTypes(types: SpaceDestinationType[]) {
	if (storageAvailable('sessionStorage')) {
		const json = JSON.stringify(types);
		sessionStorage.setItem(BrowserSpaceDestinationTypesCacheKey, json);
	}
}

export function loadCacheSpaceTypes(): SpaceDestinationType[] | null {
	var spaceTypes: string | null = null;

	if (storageAvailable('sessionStorage')) {
		spaceTypes = sessionStorage.getItem(BrowserSpaceDestinationTypesCacheKey);
	}

	if (spaceTypes != null) {
		return JSON.parse(spaceTypes);
	}

	return null;
}

export function saveCacheGameUpgrades(upgrades: GameUpgrade[]) {
	if (storageAvailable('sessionStorage')) {
		const json = JSON.stringify(upgrades);
		sessionStorage.setItem(BrowserGameUpgradesCacheKey, json);
	}
}

export function loadCacheGameUpgrades(): GameUpgrade[] | null {
	var upgrades: string | null = null;

	if (storageAvailable('sessionStorage')) {
		upgrades = sessionStorage.getItem(BrowserGameUpgradesCacheKey);
	}

	if (upgrades != null) {
		return JSON.parse(upgrades);
	}

	return null;
}

function handleError(error: any) {
	var errorDetails: ErrorDetails = {};
	if (error.response.data.statusCode && error.response.data.message) {
		errorDetails.statusCode = error.response.data.statusCode;
		errorDetails.message = error.response.data.message;
	} else {
		errorDetails.statusCode = error.response.status;
		errorDetails.message = error.response.statusText;
	}

	throw errorDetails;
}

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type: string) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0
		);
	}
}
