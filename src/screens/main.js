import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAutocomplete, resetAutocomplete } from '../redux/places';
import { fetchCoordinates } from '../redux/geocoding';
import { fetchPlaceDetails } from '../redux/place';
import AddressSearchBar from '../components/form';
import Map from '../services/mapbox';

const Main = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState(undefined);
  const [selectedPlace, setPlace] = useState(null);
  const [selectedId, setId] = useState(null);
  const [isShowMarker, setShowMarker] = useState(false);
  const { predictions } = useSelector(state => state.places);
  const { coordinates } = useSelector(state => state.geocoding);

  useEffect(() => {
    _onHandleFetching();
  }, [selectedPlace, selectedId]);

  useEffect(() => {
    keyword && dispatch(fetchAutocomplete(keyword));
  }, [keyword]);

  function _onChangePlaces() {
    let stack = [];
    predictions.forEach(({ description, place_id }) => {
      stack.push({ description, place_id });
    });
    return stack;
  }

  function _onHandleFetching() {
    return new Promise(resolve => {
      selectedPlace && dispatch(fetchCoordinates(selectedPlace));
      selectedId && dispatch(fetchPlaceDetails(selectedId));
      dispatch(resetAutocomplete());
      resolve(setShowMarker(selectedPlace ? true : false));
    });
  }

  function _onFetchPlaceDetails({ description, place_id }) {
    setPlace(description);
    setId(place_id);
  }

  return (
    <Fragment>
      <Map
        {...{
          coordinates: [coordinates.lng, coordinates.lat],
          isAppear: isShowMarker,
        }}
      />
      <AddressSearchBar
        {...{
          area: keyword,
          places: _onChangePlaces(),
          onInputArea: input => setKeyword(input),
          onSelectArea: _onFetchPlaceDetails,
        }}
      />
    </Fragment>
  );
};

export default Main;
