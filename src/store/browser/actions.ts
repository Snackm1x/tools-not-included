import { action } from 'typesafe-actions'
import SeedListFilterDTO from '../../api/dto/SeedListFilterDTO'
import Seed from 'src/types/classes/Seed';

export const enum BrowserActionTypes {
    FETCH_REQUEST = '@@browser/FETCH_REQUEST',
    FETCH_SUCCESS = '@@browser/FETCH_SUCCESS',
    FETCH_ERROR = '@@browser/FETCH_ERROR'
};

export const fetchRequest = (filter: SeedListFilterDTO) => action(BrowserActionTypes.FETCH_REQUEST, filter);
export const fetchSuccess = (data: {totalEntries: number, seeds: Seed[]}) => action(BrowserActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(BrowserActionTypes.FETCH_ERROR, message);