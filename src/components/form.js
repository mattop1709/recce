import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

/**
 * search bar use to find the street using Smart Map API
 * @param { area: string; places: Array<string>; methods: any; }   param0    given by address screen
 * @returns JSX.Element
 */
const AddressSearchBar = ({ area, places, ...methods }) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '92%',
        right: 16,
        backgroundColor: '#fff',
        top: '7%',
      }}>
      <Autocomplete
        {...{
          data: places,
          renderTextInput: () => (
            <TextInput
              {...{
                value: area,
                onChangeText: methods.onInputArea,
                blurOnSubmit: true,
                placeholder: 'e.g. KLCC, Kuala Lumpur',
                style: { padding: 12 },
                placeholderTextColor: '#dcdcdc',
              }}
            />
          ),
          inputContainerStyle: { borderColor: '#dcdcdc' },
          flatListProps: {
            keyExtractor: item => item.description,
            renderItem: ({ item }) => (
              <TouchableOpacity
                {...{
                  onPress: () => methods.onSelectArea(item),
                  style: {
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    borderBottomColor: '#dcdcdc',
                    marginHorizontal: 8,
                    borderBottomWidth: 0.5,
                  },
                }}>
                <Text
                  numberOfLines={2}
                  style={{ color: '#000', lineHeight: 20 }}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ),
          },
        }}
      />
    </View>
  );
};

export default AddressSearchBar;
