import { ofType } from 'redux-observable';
import { from, catchError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import GoogleAPI from '../services/google';

export const FETCH_PLACE_DETAILS = `FETCH_PLACE_DETAILS`;
export const UPDATE_PLACE_DETAILS_SUCCESS = `UPDATE_PLACE_DETAILS_SUCCESS`;
export const UPDATE_PLACE_DETAILS_ERROR = `UPDATE_PLACE_DETAILS_ERROR`;

const initialState = {
  details: {},
  isLoading: false,
  isError: false,
};

export const fetchPlaceDetails = id => ({
  type: 'FETCH_PLACE_DETAILS',
  id,
});

export const fetchPlaceDetailsEpic = action$ =>
  action$.pipe(
    ofType('FETCH_PLACE_DETAILS'),
    switchMap(action => {
      return from(GoogleAPI.getPlaceDetails(action.id)).pipe(
        map(action => ({
          type: 'UPDATE_PLACE_DETAILS_SUCCESS',
          payload: action.result,
        })),
      );
    }),
    catchError(error => ({ type: 'UPDATE_PLACE_DETAILS_ERROR' })),
  );

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PLACE_DETAILS:
      return { ...initialState, isLoading: true };
    case UPDATE_PLACE_DETAILS_SUCCESS:
      return { ...state, details: action.payload, isLoading: false };
    case UPDATE_PLACE_DETAILS_ERROR:
      return { ...initialState, isError: true };
    default:
      return state;
  }
};
