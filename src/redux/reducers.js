import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import places, { fetchAutocompleteEpic } from './places';
import geocoding, { fetchCoordinatesEpic } from './geocoding';

export const rootReducer = combineReducers({
  places,
  geocoding,
});

export const rootEpic = combineEpics(
  fetchAutocompleteEpic,
  fetchCoordinatesEpic,
);
