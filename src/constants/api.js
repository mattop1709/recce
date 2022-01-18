import Config from 'react-native-config';

export default {
  baseURL: Config.GOOGLE_BASE_URL,

  endpoints: {
    autocomplete: '/place/autocomplete/json',
    geocoding: '/geocode/json',
    placeDetails: '/place/details/json',
  },

  key: Config.GOOGLE_API_KEY,

  get url() {
    const { baseURL, endpoints, key } = this;
    return {
      autocomplete: `${baseURL}${endpoints.autocomplete}?key=${key}`,
      geocoding: `${baseURL}${endpoints.geocoding}?key=${key}`,
      placeDetails: `${baseURL}${endpoints.placeDetails}?key=${key}`,
    };
  },
};
