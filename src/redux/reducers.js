import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import places, { fetchAutocompleteEpic } from './places';
import geocoding, { fetchCoordinatesEpic } from './geocoding';
import place, { fetchPlaceDetailsEpic } from './place';

export const rootReducer = combineReducers({
  place,
  places,
  geocoding,
});

export const rootEpic = combineEpics(
  fetchPlaceDetailsEpic,
  fetchAutocompleteEpic,
  fetchCoordinatesEpic,
);
