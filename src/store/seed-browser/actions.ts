import { action } from 'typesafe-actions'
import SeedListFilterDTO from '../../services/api/dto/SeedListFilterDTO'
import Seed from 'src/types/classes/Seed';

export const enum SeedBrowserActionTypes {
    FETCH_ALL_REQUEST = '@@seedbrowser/FETCH_ALL_REQUEST',
    FETCH_FILTERED_REQUEST = '@@seedbrowser/FETCH_FILTERED_REQUEST',
    FETCH_LIST_SUCCESS = '@@seedbrowser/FETCH_LIST_SUCCESS',
    FETCH_LIST_ERROR = '@@seedbrowser/FETCH_LIST_ERROR',

    FETCH_DETAILS_REQUEST = '@@seedbrowser/FETCH_DETAILS_REQUEST',
    FETCH_DETAILS_SUCCESS = '@@seedbrowser/FETCH_DETAILS_SUCCESS',
    FETCH_DETAILS_ERROR = '@@seedbrowser/FETCH_DETAILS_ERROR', 
};

export type SeedListFetchSuccessModel = {
    totalEntries: number,
    seeds: Seed[]
}

export type SeedDetailsRequestModel = {
    seedNumber: string,
    gameVersion?: string
}

export const fetchAllRequest = () => action(SeedBrowserActionTypes.FETCH_ALL_REQUEST);
export const fetchFilteredRequest = (filter: SeedListFilterDTO) => action(SeedBrowserActionTypes.FETCH_FILTERED_REQUEST, filter);
export const fetchListSuccess = (data: SeedListFetchSuccessModel) => action(SeedBrowserActionTypes.FETCH_LIST_SUCCESS, data);
export const fetchListError = (message: string) => action(SeedBrowserActionTypes.FETCH_LIST_ERROR, message);

export const fetchDetailsRequest = (request: SeedDetailsRequestModel) => action(SeedBrowserActionTypes.FETCH_DETAILS_REQUEST, request);
export const fetchDetailsSuccess = (data: Seed) => action(SeedBrowserActionTypes.FETCH_DETAILS_SUCCESS, data);
export const fetchDetailsError = (message: string) => action(SeedBrowserActionTypes.FETCH_DETAILS_ERROR, message);

