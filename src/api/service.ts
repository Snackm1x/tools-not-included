import API from './api'
import SeedListFilterDTO from './dto/SeedListFilterDTO';
import SeedListDTO from './dto/SeedListDTO';

export function loadFilteredSeeds(filter: SeedListFilterDTO) {
    return API.post<SeedListDTO>("/seeds/filtered", filter, { headers: { 'Accept': 'application/json' } })
        .then(res => res.data)
        .catch(error => {
            throw error;
        });
}