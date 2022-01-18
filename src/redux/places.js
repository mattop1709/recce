import { ofType } from 'redux-observable';
import { delay, from, catchError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import GoogleAPI from '../services/google';

export const FETCH_AUTOCOMPLETE = `FETCH_AUTOCOMPLETE`;
export const UPDATE_AUTOCOMPLETE_SUCCESS = `UPDATE_AUTOCOMPLETE_SUCCESS`;
export const UPDATE_AUTOCOMPLETE_ERROR = `UPDATE_AUTOCOMPLETE_ERROR`;

const initialState = {
  predictions: [],
  isLoading: false,
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
      return from(GoogleAPI.getAutocomplete(action.keyword)).pipe(
        map(action => ({
          type: 'UPDATE_AUTOCOMPLETE_SUCCESS',
          payload: action.predictions,
        })),
      );
    }),
    catchError(error => ({ type: 'UPDATE_AUTOCOMPLETE_ERROR' })),
  );

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_AUTOCOMPLETE:
      return { ...initialState, isLoading: true };
    case UPDATE_AUTOCOMPLETE_SUCCESS:
      return { ...state, isLoading: false, predictions: action.payload };
    case UPDATE_AUTOCOMPLETE_ERROR:
      return { ...initialState, isError: true };
    default:
      return state;
  }
};
