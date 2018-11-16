// ./src/store/heroes/reducer.ts

import { Reducer } from 'redux'
import { HeroesActionTypes } from './actions'

import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { Hero } from './types'

// Type-safe initialState!
export const initialState: HeroesState = {
  data: [],
  errors: undefined,
  loading: false
}

export type HeroesState = Readonly<{
  loading: boolean
  data: Hero[]
  errors?: string
}>

export type HeroesAction = ActionType<typeof actions>;

const reducer: Reducer<HeroesState, HeroesAction> = (state = initialState, action) => {
  switch (action.type) {
    case HeroesActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case HeroesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case HeroesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}


export { reducer as heroesReducer }