import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { GameUpgrade, GeyserType, Seed, SpaceDestinationType } from 'src/api/models';
import { Reducer } from 'redux';
import { SeedBrowserActionTypes } from './actions';

export type SeedBrowserState = Readonly<{
	list: {
		seeds?: Seed[];
		totalEntries?: number;
		reloading: boolean;
	};
	details: {
		seed?: Seed;
	};
	gameUpgrades: { [key: string]: GameUpgrade };
	geyserTypes: { [key: string]: GeyserType };
	spaceDestinationTypes: { [key: string]: SpaceDestinationType };
}>;

const initialState: SeedBrowserState = {
	list: {
		seeds: [],
		totalEntries: undefined,
		reloading: false
	},
	details: {
		seed: undefined
	},
	gameUpgrades: {},
	geyserTypes: {},
	spaceDestinationTypes: {}
};

const reducer: Reducer<SeedBrowserState, SeedBrowserAction> = (state = initialState, action) => {
	switch (action.type) {
		case SeedBrowserActionTypes.GET_FILTERED_SEEDS: {
			return { ...state, list: { ...state.list, reloading: true } };
		}
		case SeedBrowserActionTypes.GET_FILTERED_SEEDS_SUCCESS: {
			return {
				...state,
				list: {
					...state.list,
					totalEntries: action.payload.totalEntries,
					seeds: action.payload.seeds,
					reloading: false
				}
			};
		}

		case SeedBrowserActionTypes.GET_SEED: {
			return { ...state, details: { ...state.details, seed: undefined } };
		}
		case SeedBrowserActionTypes.GET_SEED_SUCCESS: {
			return { ...state, details: { ...state.details, seed: action.payload } };
		}

		case SeedBrowserActionTypes.GET_GAME_UPGRADES: {
			return state;
		}
		case SeedBrowserActionTypes.GET_GAME_UPGRADES_SUCCESS: {
			return { ...state, gameUpgrades: action.payload };
		}

		case SeedBrowserActionTypes.GET_GEYSER_TYPES: {
			return state;
		}
		case SeedBrowserActionTypes.GET_GEYSER_TYPES_SUCCESS: {
			return { ...state, geyserTypes: action.payload };
		}

		case SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES: {
			return state;
		}
		case SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES_SUCCESS: {
			return { ...state, spaceDestinationTypes: action.payload };
		}

		case SeedBrowserActionTypes.REPORT_INVALID_SEED: {
			return state;
		}

		case SeedBrowserActionTypes.REQUEST_ERROR: {
			return { ...state, loading: false, errors: action.payload };
		}

		default: {
			return state;
		}
	}
};

export type SeedBrowserAction = ActionType<typeof actions>;
export { reducer as seedBrowserReducer };
