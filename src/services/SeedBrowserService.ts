import API from './api/api'
import SeedListFilterDTO from './api/dto/SeedListFilterDTO';
import SeedListDTO from './api/dto/SeedListDTO';
import { SeedDetailsRequestModel } from 'src/store/seed-browser/actions';
import SeedDTO from './api/dto/SeedDTO';

export function loadFilteredSeeds(filter: SeedListFilterDTO) {
    return API.post<SeedListDTO>("/seeds/filtered", filter, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => {
            throw error;
        });
}

export function loadAllSeeds() {
    return API.post<SeedListDTO>("/seeds/all", { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => {
            throw error;
        });
}

export function loadSeedDetails(request: SeedDetailsRequestModel) {
    return API.get<SeedDTO>("/seeds/" + request.seedNumber + "/" + request.gameVersion, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => {
            throw error;
        });
}