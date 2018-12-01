import API from "../../../api/api";
import { SeedListFilter, SeedList, Seed } from "src/api/models";
import { SeedDetailsRequestModel } from "src/api/request-models";

export function getFilteredSeeds(filter: SeedListFilter) {
    return API.post<SeedList>("/seeds/filtered", filter, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function getAllSeeds() {
    return API.post<SeedList>("/seeds/all", { headers: { 'Accept': 'application/json' } })
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