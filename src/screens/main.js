import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useStore } from 'react-redux';
import { fetchAutocomplete, fetchCoordinates } from '../redux/places';

const Main = () => {
  const [keyword, setKeyword] = useState(null);
  const [selectedPlace, setPlace] = useState(null);
  const [store, places] = [useStore(), useSelector(state => state.places)];

  useEffect(() => {
    selectedPlace && store.dispatch(fetchCoordinates(selectedPlace));
  }, [selectedPlace]);

  return (
    <View>
      <Button
        title="Test Redux Autocomplete"
        onPress={() => store.dispatch(fetchAutocomplete('Kajang'))}
      />
      <Text>
        My Places {places.coordinates.lat} {places.coordinates.lng}
      </Text>
      {places.predictions.map(({ description }) => (
        <Text {...{ key: description, onPress: () => setPlace(description) }}>
          {description}
        </Text>
      ))}
    </View>
  );
};

export default Main;
