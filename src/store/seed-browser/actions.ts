import { action } from 'typesafe-actions'
import { SeedListFilter, Seed, SeedList } from 'src/api/models';
import { SeedDetailsRequestModel } from 'src/api/request-models';

export const enum SeedBrowserActionTypes {
    FETCH_ALL_REQUEST = '@@seedbrowser/FETCH_ALL_REQUEST',
    FETCH_FILTERED_REQUEST = '@@seedbrowser/FETCH_FILTERED_REQUEST',
    FETCH_LIST_SUCCESS = '@@seedbrowser/FETCH_LIST_SUCCESS',
    FETCH_LIST_ERROR = '@@seedbrowser/FETCH_LIST_ERROR',

    FETCH_ONE_REQUEST = '@@seedbrowser/FETCH_ONE_REQUEST',
    FETCH_ONE_SUCCESS = '@@seedbrowser/FETCH_ONE_SUCCESS',
    FETCH_ONE_ERROR = '@@seedbrowser/FETCH_ONE_ERROR'
};

export const fetchAllRequest = () => action(SeedBrowserActionTypes.FETCH_ALL_REQUEST);
export const fetchFilteredRequest = (filter: SeedListFilter) => action(SeedBrowserActionTypes.FETCH_FILTERED_REQUEST, filter);
export const fetchListSuccess = (data: SeedList) => action(SeedBrowserActionTypes.FETCH_LIST_SUCCESS, data);
export const fetchListError = (message: string) => action(SeedBrowserActionTypes.FETCH_LIST_ERROR, message);

export const fetchDetailsRequest = (request: SeedDetailsRequestModel) => action(SeedBrowserActionTypes.FETCH_ONE_REQUEST, request);
export const fetchDetailsSuccess = (data: Seed) => action(SeedBrowserActionTypes.FETCH_ONE_SUCCESS, data);
export const fetchDetailsError = (message: string) => action(SeedBrowserActionTypes.FETCH_ONE_ERROR, message);