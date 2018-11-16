import { RouterAction, LocationChangeAction } from 'react-router-redux';

import  { HeroesAction }  from './heroes/reducer';

type ReactRouterAction = RouterAction | LocationChangeAction;
export type RootAction = ReactRouterAction | HeroesAction;
