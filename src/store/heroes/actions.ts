import { action } from 'typesafe-actions'

export const enum HeroesActionTypes {
    FETCH_REQUEST = '@@heroes/FETCH_REQUEST',
    FETCH_SUCCESS = '@@heroes/FETCH_SUCCESS',
    FETCH_ERROR = '@@heroes/FETCH_ERROR',
    SELECTED = '@@heroes/SELECTED'
  }


export const fetchRequest = () => action(HeroesActionTypes.FETCH_REQUEST)

export const fetchSuccess = (data: any) => action(HeroesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(HeroesActionTypes.FETCH_ERROR, message)