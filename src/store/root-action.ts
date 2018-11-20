import { RouterAction, LocationChangeAction } from 'react-router-redux';

import { SeedBrowserAction } from './seed-browser/reducer';

type ReactRouterAction = RouterAction | LocationChangeAction;
export type RootAction = ReactRouterAction | SeedBrowserAction;
