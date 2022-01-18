import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import places, { fetchAutocompleteEpic, fetchCoordinatesEpic } from './places';

export const rootReducer = combineReducers({ places });

export const rootEpic = combineEpics(
  fetchAutocompleteEpic,
  fetchCoordinatesEpic,
);
