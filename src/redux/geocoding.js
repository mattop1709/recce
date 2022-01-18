import { ofType } from 'redux-observable';
import { from, catchError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import GoogleAPI from '../services/google';

export const FETCH_COORDINATES = `FETCH_COORDINATES`;
export const UPDATE_COORDINATES_SUCCESS = `UPDATE_COORDINATES_SUCCESS`;
export const UPDATE_COORDINATES_ERROR = `UPDATE_COORDINATES_ERROR`;

const initialState = {
  coordinates: {},
  isLoading: false,
  isError: false,
};

export const fetchCoordinates = place => ({
  type: 'FETCH_COORDINATES',
  place,
});

export const fetchCoordinatesEpic = action$ =>
  action$.pipe(
    ofType('FETCH_COORDINATES'),
    switchMap(action => {
      return from(GoogleAPI.getGeocoding(action.place)).pipe(
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
    case FETCH_COORDINATES:
      return { ...initialState, isLoading: true };
    case UPDATE_COORDINATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coordinates: action.payload,
      };
    case UPDATE_COORDINATES_ERROR:
      return { ...initialState, isError: true };
    default:
      return state;
  }
};
