import Geocoder from 'react-native-geocoding';
import API from '../constants/api';

Geocoder.init(API.key, { language: 'en' });

class GoogleAPI {
  /**
   * this method provide prediction of places
   * @param { string }  keyword   based on user input
   * @returns Promise<any>
   */
  getAutocomplete(keyword) {
    if (!keyword) return;
    return fetch(`${API?.url?.autocomplete}&input=${keyword}`).then(response =>
      response.json(),
    );
  }

  /**
   * this method provide coordinates of the selected autocomplete result
   * @param { string }  place     based on autocomplete
   * @returns Promise<any>
   */
  getGeocoding(place) {
    if (!place) return;
    return Geocoder.from(place).then(response => response);
  }
}

export default new GoogleAPI();
