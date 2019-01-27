import { action } from 'typesafe-actions'
import { Seed, SeedList, GameUpgrade, GeyserType, SpaceDestinationType, SeedBrowserFilter, AddInvalidSeedReportRequest, ElementBasicInfo as ElementNameStateColor } from '@api/models';
import { SeedDetailsRequestModel } from '@api/request-models';

export const enum SeedBrowserActionTypes {
    GET_FILTERED_SEEDS = '@@seedbrowser/GET_FILTERED_SEEDS',
    GET_FILTERED_SEEDS_SUCCESS = '@@seedbrowser/GET_FILTERED_SEEDS_SUCCESS',

    GET_SEED = '@@seedbrowser/GET_SEED',
    GET_SEED_SUCCESS = '@@seedbrowser/GET_SEED_SUCCESS',

    GET_GAME_UPGRADES = '@@seedbrowser/GET_GAME_UPGRADES',
    GET_GAME_UPGRADES_SUCCESS = '@@seedbrowser/GET_GAME_UPGRADES_SUCCESS',

    GET_GEYSER_TYPES = '@@seedbrowser/GET_GEYSER_TYPES',
    GET_GEYSER_TYPES_SUCCESS = '@@seedbrowser/GET_GEYSER_TYPES_SUCCESS',

    GET_SPACE_DESTINATION_TYPES = '@@seedbrowser/GET_SPACE_DESTINATION_TYPES',
    GET_SPACE_DESTINATION_TYPES_SUCCESS = '@@seedbrowser/GET_SPACE_DESTINATION_TYPES_SUCCESS',

    GET_ELEMENT_BASIC_INFO = '@@seedbrowser/GET_ELEMENT_BASIC_INFO',
    GET_ELEMENT_BASIC_INFO_SUCCESS = '@@seedbrowser/GET_ELEMENT_BASIC_INFO_SUCCESS',

    REPORT_INVALID_SEED = '@@seedbrowser/REPORT_INVALID_SEED',

    REQUEST_ERROR = '@@seedbrowser/REQUEST_ERROR',
};

export const getFilteredSeeds = (filter: SeedBrowserFilter) => action(SeedBrowserActionTypes.GET_FILTERED_SEEDS, filter);
export const getSeedListSuccess = (data: SeedList) => action(SeedBrowserActionTypes.GET_FILTERED_SEEDS_SUCCESS, data);

export const getSeed = (request: SeedDetailsRequestModel) => action(SeedBrowserActionTypes.GET_SEED, request);
export const getSeedSuccess = (data: Seed) => action(SeedBrowserActionTypes.GET_SEED_SUCCESS, data);

export const getGameUpgrades = () => action(SeedBrowserActionTypes.GET_GAME_UPGRADES);
export const getGameUpgradesSuccess = (data: { [key: string]: GameUpgrade }) => action(SeedBrowserActionTypes.GET_GAME_UPGRADES_SUCCESS, data);

export const getGeyserTypes = () => action(SeedBrowserActionTypes.GET_GEYSER_TYPES);
export const getGeyserTypesSuccess = (data: { [key: string]: GeyserType }) => action(SeedBrowserActionTypes.GET_GEYSER_TYPES_SUCCESS, data);

export const getSpaceDestinationTypes = () => action(SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES);
export const getSpaceDestinationTypesSuccess = (data: { [key: string]: SpaceDestinationType }) => action(SeedBrowserActionTypes.GET_SPACE_DESTINATION_TYPES_SUCCESS, data);

export const getElementBasicInfo = () => action(SeedBrowserActionTypes.GET_ELEMENT_BASIC_INFO);
export const getElementBasicInfoSuccess = (data: { [key: string]: ElementNameStateColor }) => action(SeedBrowserActionTypes.GET_ELEMENT_BASIC_INFO_SUCCESS, data);

export const reportInvalidSeed = (request: AddInvalidSeedReportRequest) => action(SeedBrowserActionTypes.REPORT_INVALID_SEED, request);

export const requestError = (message: string) => action(SeedBrowserActionTypes.REQUEST_ERROR, message);