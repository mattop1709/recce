import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useStore } from 'react-redux';
import { fetchAutocomplete } from '../redux/places';
import { fetchCoordinates } from '../redux/geocoding';
import Map from '../services/mapbox';

const Main = () => {
  const [keyword, setKeyword] = useState(null);
  const [selectedPlace, setPlace] = useState(null);
  const [store, places] = [useStore(), useSelector(state => state.places)];
  const geocoding = useSelector(state => state.geocoding);

  useEffect(() => {
    selectedPlace !== null && store.dispatch(fetchCoordinates(selectedPlace));
  }, [selectedPlace]);

  const {
    coordinates: { lat, lng },
  } = geocoding;

  return <Map {...{ coordinates: [101.71366, 3.15916] }}></Map>;
};

export default Main;

// TO BE DELETED
// return (
//   <View>
//     <Button
//       title="Test Redux Autocomplete"
//       onPress={() => store.dispatch(fetchAutocomplete('Kajang'))}
//     />
//     <Text>My Places</Text>
//     {places.predictions.map(({ description }) => (
//       <Text {...{ key: description, onPress: () => setPlace(description) }}>
//         {description}
//       </Text>
//     ))}
//   </View>
// );
