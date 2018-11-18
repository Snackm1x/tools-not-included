import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type HeroesAction = ActionType<typeof actions>;
