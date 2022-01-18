import { ofType } from 'redux-observable';
import { delay, from, catchError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import GoogleAPI from '../services/google';

export const FETCH_AUTOCOMPLETE = `FETCH_AUTOCOMPLETE`;
export const UPDATE_AUTOCOMPLETE_SUCCESS = `UPDATE_AUTOCOMPLETE_SUCCESS`;
export const UPDATE_AUTOCOMPLETE_ERROR = `UPDATE_AUTOCOMPLETE_ERROR`;
export const FETCH_COORDINATES = `FETCH_COORDINATES`;
export const UPDATE_COORDINATES_SUCCESS = `UPDATE_COORDINATES_SUCCESS`;
export const UPDATE_COORDINATES_ERROR = `UPDATE_COORDINATES_ERROR`;

const initialState = {
  predictions: [],
  coordinates: {},
  isLoadingAutocomplete: false,
  isLoadingGeocoding: false,
  isError: false,
};

export const fetchAutocomplete = keyword => ({
  type: 'FETCH_AUTOCOMPLETE',
  keyword,
});

export const fetchAutocompleteEpic = action$ =>
  action$.pipe(
    ofType('FETCH_AUTOCOMPLETE'),
    delay(1000),
    switchMap(action => {
      function getRequest(keyword) {
        const request = GoogleAPI.getAutocomplete(keyword);
        return from(request);
      }

      return getRequest(action.keyword).pipe(
        map(action => ({
          type: 'UPDATE_AUTOCOMPLETE_SUCCESS',
          payload: action.predictions,
        })),
      );
    }),
    catchError(error => ({ type: 'UPDATE_AUTOCOMPLETE_ERROR' })),
  );

export const fetchCoordinates = place => ({
  type: 'FETCH_COORDINATES',
  place,
});

export const fetchCoordinatesEpic = action$ =>
  action$.pipe(
    ofType('FETCH_COORDINATES'),
    delay(1000),
    switchMap(action => {
      function getRequest(place) {
        const request = GoogleAPI.getGeocoding(place);
        return from(request);
      }

      return getRequest(action.place).pipe(
        map(action => ({
          type: 'UPDATE_COORDINATES_SUCCESS',
          payload: action.results[0].geometry.location,
        })),
      );
    }),
    catchError(error => ({ type: 'UPDATE_COORDINATES_ERROR' })),
  );

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_AUTOCOMPLETE:
      return { ...initialState, isLoadingAutocomplete: true };
    case UPDATE_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        isLoadingAutocomplete: false,
        predictions: action.payload,
      };
    case UPDATE_AUTOCOMPLETE_ERROR:
      return { ...initialState, isError: true };
    case FETCH_COORDINATES:
      return { ...initialState, isLoadingGeocoding: true };
    case UPDATE_COORDINATES_SUCCESS:
      return {
        ...state,
        isLoadingGeocoding: false,
        coordinates: action.payload,
      };
    case UPDATE_COORDINATES_ERROR:
      return { ...initialState, isError: true };
    default:
      return state;
  }
};
