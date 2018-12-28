import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions';

import { SeedBrowserActionTypes } from './actions'
import * as actions from './actions';
import { Seed, GameUpgrade, GeyserType, SpaceDestinationType } from 'src/api/models';

export type SeedBrowserState = Readonly<{
    list: {
        seeds?: Seed[],
        totalEntries?: number,
        loading: boolean,
        errors?: string
    },
    details: {
        seed?: Seed,
        loading: boolean,
        errors?: string
    },
    loading: boolean
    gameUpgrades: { [key: string]: GameUpgrade },
    geyserTypes: { [key: string]: GeyserType },
    spaceDestinationTypes: { [key: string]: SpaceDestinationType }
}>

const initialState: SeedBrowserState = {
    list: {
        seeds: [],
        totalEntries: undefined,
        loading: false,
        errors: undefined
    },
    details: {
        seed: undefined,
        loading: false,
        errors: undefined
    },
    loading: false,
    gameUpgrades: {},
    geyserTypes: {},
    spaceDestinationTypes: {}
};

const reducer: Reducer<SeedBrowserState, SeedBrowserAction> = (state = initialState, action) => {
    switch (action.type) {
        case SeedBrowserActionTypes.GET_FILTERED_SEEDS: {
            return { ...state, list: {...state.list, loading: true} };
        }
        case SeedBrowserActionTypes.GET_FILTERED_SEEDS_SUCCESS: {
            return { ...state, list: {...state.list, loading: false, totalEntries: action.payload.totalEntries, seeds: action.payload.seeds} };
        }
        case SeedBrowserActionTypes.GET_FILTERED_SEEDS_ERROR: {
            return { ...state, list: {...state.list, loading: false, errors: action.payload} };
        }

        case SeedBrowserActionTypes.GET_SEED: {
            return { ...state, details: {...state.details, loading: true} };
        }
         case SeedBrowserActionTypes.GET_SEED_SUCCESS: {
            return { ...state, details: {...state.details, loading: false, seed: action.payload} };
        }
        case SeedBrowserActionTypes.GET_SEED_ERROR: {
            return { ...state, details: {...state.details, loading: false, errors: action.payload} };
        }

        case SeedBrowserActionTypes.GET_GAME_UPGRADES: {
            return { ...state, loading: true };
        }
        case SeedBrowserActionTypes.GET_GAME_UPGRADES_SUCCESS: {
            return { ...state, loading: false, gameUpgrades: action.payload };
        }

        case SeedBrowserActionTypes.GET_GEYSER_TYPES: {
            return { ...state, loading: true };
        }
        case SeedBrowserActionTypes.GET_GEYSER_TYPES_SUCCESS: {
            return { ...state, loading: false, geyserTypes: action.payload };
        }

        case SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES: {
            return { ...state, loading: true };
        }
        case SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES_SUCCESS: {
            return { ...state, loading: false, spaceDestinationTypes: action.payload };
        }

        case SeedBrowserActionTypes.REPORT_INVALID_SEED: {
            return { ...state };
        }
       
        default: {
            return state;
        }
    }
}

export type SeedBrowserAction = ActionType<typeof actions>;
export { reducer as seedBrowserReducer };