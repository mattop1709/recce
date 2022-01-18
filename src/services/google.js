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
    const url = `${API?.url?.autocomplete}&input=${keyword}`;
    return fetch(url).then(response => response.json());
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

  /**
   * this method provide extensive information about the selected place
   * @param { string }  id        based on the selected place id
   * @returns Promise<any>
   */
  getPlaceDetails(id) {
    if (!id) return;
    const url = `${API.url.placeDetails}&place_id=${id}`;
    return fetch(url).then(response => response.json());
  }
}

export default new GoogleAPI();
