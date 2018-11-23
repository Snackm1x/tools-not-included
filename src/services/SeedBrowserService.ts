import API from './api/api'
import SeedListFilterDTO from './api/dto/SeedListFilterDTO';
import SeedListDTO from './api/dto/SeedListDTO';
import { SeedDetailsRequestModel } from 'src/store/seed-browser/actions';
import SeedDTO from './api/dto/SeedDTO';

export function loadFilteredSeeds(filter: SeedListFilterDTO) {
    return API.post<SeedListDTO>("/seeds/filtered", filter, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function loadAllSeeds() {
    return API.post<SeedListDTO>("/seeds/all", { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => handleError(error));
}

export function loadSeedDetails(request: SeedDetailsRequestModel) {
    var url = "/seeds/" + request.seedNumber;
    if (request.gameVersion != undefined) url += "/" + request.gameVersion;
    return API.get<SeedDTO>(url, { headers: { 'Accept': 'application/json' } })
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