import API from "../../../api/api";
import { SeedListFilter, SeedList, Seed, GeyserType, SpaceDestinationType, GameUpgrade, SeedBrowserFilter } from "src/api/models";
import { SeedDetailsRequestModel } from "src/api/request-models";
import { string } from "prop-types";
import { SeedBrowserFilterFormValues } from "src/pages/seeds/browser/components/SeedBrowserFilterForm";

export function getFilteredSeeds(filter: SeedBrowserFilter) {
    return API.post<SeedList>("/seeds/filtered", filter, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => handleError(error));
}

// export function getAllSeeds() {
//     return API.post<SeedList>("/seeds/all", { headers: { 'Accept': 'application/json' } })
//         .then(res => res.data)
//         .catch(error => handleError(error));
// }

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