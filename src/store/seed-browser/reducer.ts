import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions';

import { SeedBrowserActionTypes } from './actions'
import * as actions from './actions';
import { Seed } from 'src/api/models';

export type SeedBrowserState = Readonly<{
    list: {
        seedList?: Seed[],
        totalEntries?: number,
        loading: boolean,
        errors?: string
    },
    details: {
        seed?: Seed,
        loading: boolean,
        errors?: string
    }
}>

const initialState: SeedBrowserState = {
    list: {
        seedList: [],
        totalEntries: undefined,
        loading: false,
        errors: undefined
    },
    details: {
        seed: undefined,
        loading: false,
        errors: undefined
    }
};

const reducer: Reducer<SeedBrowserState, SeedBrowserAction> = (state = initialState, action) => {
    switch (action.type) {
        case SeedBrowserActionTypes.FETCH_ALL_REQUEST: {
            return { ...state, list: {...state.list, loading: true} };
        }
        case SeedBrowserActionTypes.FETCH_FILTERED_REQUEST: {
            return { ...state, list: {...state.list, loading: true} };
        }
        case SeedBrowserActionTypes.FETCH_LIST_SUCCESS: {
            return { ...state, list: {...state.list, loading: false, totalEntries: action.payload.totalEntries, seedList: action.payload.seeds} };
        }
        case SeedBrowserActionTypes.FETCH_LIST_ERROR: {
            return { ...state, list: {...state.list, loading: false, errors: action.payload} };
        }

        case SeedBrowserActionTypes.FETCH_ONE_REQUEST: {
            return { ...state, details: {...state.details, loading: true} };
        }
         case SeedBrowserActionTypes.FETCH_ONE_SUCCESS: {
            return { ...state, details: {...state.details, loading: false, seed: action.payload} };
        }
        case SeedBrowserActionTypes.FETCH_ONE_ERROR: {
            return { ...state, details: {...state.details, loading: false, errors: action.payload} };
        }
       
        default: {
            return state;
        }
    }
}

export type SeedBrowserAction = ActionType<typeof actions>;
export { reducer as seedBrowserReducer };