import API from '../../../api/api';
import {
    AddInvalidSeedReportRequest,
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
    return API.post<SeedList>("/seeds/filtered", filter, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function getSeed(request: SeedDetailsRequestModel) {
    var url = "/seeds/" + request.seedNumber;
    if (request.gameVersion != undefined) url += "/" + request.gameVersion;
    return API.get<Seed>(url, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function getGeyserTypes() {
    var url = "/geysers/types";
    return API.get<GeyserType[]>(url)
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function getSpaceDestinationTypes() {
    var url = "/spacedestinations/types";
    return API.get<SpaceDestinationType[]>(url)
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function getGameUpgrades() {
    var url = "/gameupgrades";
    return API.get<GameUpgrade[]>(url)
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function reportInvalidSeed(request: AddInvalidSeedReportRequest) {
    var url = "/seeds/reportInvalid";
    return API.post(url, request, { headers: { 'Accept': 'application/json' }})
        .then(res => res.data)
        .catch(error => handleError(error));
}

/**
 *  Local storage
 */
export function saveFilterFormValuesToLocalStorage(values: SeedBrowserFilterFormValues) {
    var key = "seedbrowser-filter";

    try {
        const json = JSON.stringify(values);
        localStorage.setItem(key, json);
      } catch (err) {
        // ignore - browser has no permissions to write to LS
      }
}

export function loadFilterFormValuesFromLocalStorage(): SeedBrowserFilterFormValues {
    var key = "seedbrowser-filter";
    var filter: string | null = null;

    try {
        filter = localStorage.getItem(key);
      } catch (err) {
        // ignore - browser has no permissions to read to LS
      }

      if (filter != null) {
          return JSON.parse(filter);
      }

      return {rules: []};
}

export function saveDetailsShowNonPresentToLocalStorage(show: boolean) {
    var key = "seedbrowser-shownonpresent";

    try {
        const json = JSON.stringify(show);
        localStorage.setItem(key, json);
      } catch (err) {
        // ignore - browser has no permissions to write to LS
      }
}

export function loadDetailsShowNonPresentFromLocalStorage(): boolean {
    var key = "seedbrowser-shownonpresent";
    var show: string | null = null;

    try {
        show = localStorage.getItem(key);
      } catch (err) {
        // ignore - browser has no permissions to read to LS
      }

     return show === "true";
}


export function saveFilterPageSizeToLocalStorage(pageSize: number) {
    var key = "seedbrowser-filter-pagesize";

    try {
        const json = JSON.stringify(pageSize);
        localStorage.setItem(key, json);
      } catch (err) {
        // ignore - browser has no permissions to write to LS
      }
}

export function loadFilterPageSizeFromLocalStorage(): number {
    var key = "seedbrowser-filter-pagesize";
    var pageSize: string | null = null;

    try {
        pageSize = localStorage.getItem(key);
      } catch (err) {
        // ignore - browser has no permissions to read to LS
      }

     return pageSize ? parseInt(pageSize) : 20;
}

function handleError(error: any) {
    if (error.response) {
        if (error.response.status == 404) {
            return 404;
        }
        if (error.response.data) {
            console.log(error.response.data);
            return error.response;
        }
    } else {
        throw error;
    }
}