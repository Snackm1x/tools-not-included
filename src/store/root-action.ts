import { RouterAction, LocationChangeAction } from 'react-router-redux';

import  { HeroesAction }  from './heroes/reducer';
import { BrowserAction } from './browser';

type ReactRouterAction = RouterAction | LocationChangeAction;
export type RootAction = ReactRouterAction | HeroesAction;
