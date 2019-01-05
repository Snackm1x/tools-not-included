import API from '../../../api/api';
import {
	AddInvalidSeedReportRequest,
	ErrorDetails,
	GameUpgrade,
	GeyserType,
	Seed,
	SeedBrowserFilter,
	SeedList,
	SpaceDestinationType
} from '../../../api/models';
import { SeedBrowserFilterFormValues } from '../../../pages/seeds/browser/components/SeedBrowserFilterForm';
import { SeedDetailsRequestModel } from '../../../api/request-models';

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
	var url = '/geysers/types';
	return API.get<GeyserType[]>(url).then((res) => res.data).catch((error) => handleError(error));
}

export function getSpaceDestinationTypes() {
	var url = '/spacedestinations/types';
	return API.get<SpaceDestinationType[]>(url).then((res) => res.data).catch((error) => handleError(error));
}

export function getGameUpgrades() {
	var url = '/gameupgrades';
	return API.get<GameUpgrade[]>(url).then((res) => res.data).catch((error) => handleError(error));
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
export function saveFilterFormValuesToLocalStorage(values: SeedBrowserFilterFormValues) {
	if (storageAvailable('localStorage')) {
		var key = 'seedbrowser-filter';
		const json = JSON.stringify(values);
		localStorage.setItem(key, json);
	}
}

export function loadFilterFormValuesFromLocalStorage(): SeedBrowserFilterFormValues {
	var filter: string | null = null;

	if (storageAvailable('localStorage')) {
		var key = 'seedbrowser-filter';
		filter = localStorage.getItem(key);
	}

	if (filter != null) {
		return JSON.parse(filter);
	}

	return { rules: [] };
}

export function saveDetailsShowNonPresentToLocalStorage(show: boolean) {
	if (storageAvailable('localStorage')) {
		var key = 'seedbrowser-shownonpresent';
		const json = JSON.stringify(show);
		localStorage.setItem(key, json);
	}
}

export function loadDetailsShowNonPresentFromLocalStorage(): boolean {
	if (storageAvailable('localStorage')) {
		var key = 'seedbrowser-shownonpresent';
		var show: string | null = null;
		show = localStorage.getItem(key);
		return show === 'true';
	}

	return false;
}

export function saveFilterPageSizeToLocalStorage(pageSize: number) {
	if (storageAvailable('localStorage')) {
		var key = 'seedbrowser-filter-pagesize';
		const json = JSON.stringify(pageSize);
		localStorage.setItem(key, json);
	}
}

export function loadFilterPageSizeFromLocalStorage(): number {
	if (storageAvailable('localStorage')) {
		var key = 'seedbrowser-filter-pagesize';
		var pageSize: string | null = null;

		pageSize = localStorage.getItem(key);

		return pageSize ? parseInt(pageSize) : 20;
	} else {
		return 20;
	}
}

export function saveFilterPageToSessionStorage(pageSize: number) {
	if (storageAvailable('sessionStorage')) {
		var key = 'seedbrowser-filter-page';
		const json = JSON.stringify(pageSize);
		sessionStorage.setItem(key, json);
	}
}

export function loadFilterPageFromSessionStorage(): number {
	if (storageAvailable('sessionStorage')) {
		var key = 'seedbrowser-filter-page';
		var page: string | null = null;

		page = sessionStorage.getItem(key);

		return page ? parseInt(page) : 1;
	} else {
		return 1;
	}
}

function handleError(error: any) {
	var errorDetails: ErrorDetails = {};
	if (error.response.data) {
		(errorDetails.statusCode = error.response.data.statusCode),
			(errorDetails.message = error.response.data.message);
	} else {
		(errorDetails.statusCode = error.response.status), (errorDetails.message = error.response.statusText);
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
