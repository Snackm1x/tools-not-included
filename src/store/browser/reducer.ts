import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions';

import { BrowserActionTypes } from './actions'
import * as actions from './actions';

import Seed from 'src/types/classes/Seed';

export type BrowserState = Readonly<{
    seedList: Seed[];
    totalEntries: number;
     loading: boolean;
    errors?: string;
}>

export const initialState: BrowserState = {
    seedList: [],
    totalEntries: 0,
    errors: undefined,
    loading: false
};

export type BrowserAction = ActionType<typeof actions>;

const reducer: Reducer<BrowserState, BrowserAction> = (state = initialState, action) => {
    switch (action.type) {
        case BrowserActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true };
        }
        case BrowserActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, totalEntries: action.payload.totalEntries, seedList: action.payload.seeds };
        }
        case BrowserActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
}

export { reducer as browserReducer };