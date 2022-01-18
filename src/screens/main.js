import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useStore } from 'react-redux';
import { fetchAutocomplete } from '../redux/places';
import { fetchCoordinates } from '../redux/geocoding';
import GoogleAPI from '../services/google';

const Main = () => {
  const [keyword, setKeyword] = useState(null);
  const [selectedPlace, setPlace] = useState(null);
  const [store, places] = [useStore(), useSelector(state => state.places)];
  const geocoding = useSelector(state => state.geocoding);

  useEffect(() => {
    selectedPlace !== null && store.dispatch(fetchCoordinates(selectedPlace));
  }, [selectedPlace]);

  return (
    <View>
      <Button
        title="Test Redux Autocomplete"
        onPress={() => store.dispatch(fetchAutocomplete('Kajang'))}
      />
      <Button
        title="Get Place Details"
        onPress={async () => {
          const response = await GoogleAPI.getPlaceDetails(
            'ChIJN1t_tDeuEmsRUsoyG83frY4',
          );
          console.log(response);
        }}
      />
      <Text>My Places</Text>
      {places.predictions.map(({ description }) => (
        <Text {...{ key: description, onPress: () => setPlace(description) }}>
          {description}
        </Text>
      ))}
    </View>
  );
};

export default Main;
