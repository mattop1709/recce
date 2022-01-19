import React from 'react';
import { View, Image } from 'react-native';
import Config from 'react-native-config';
import MapboxGL from '@react-native-mapbox-gl/maps';

const Map = ({ coordinates }) => {
  MapboxGL.setAccessToken(Config.MAPBOX_API_KEY);
  return (
    <View {...{ style: { height: '100%', width: '100%', flex: 1 } }}>
      <MapboxGL.MapView
        {...{
          style: { flex: 1 },
          zoomEnabled: true,
        }}>
        <MapboxGL.Camera
          {...{
            zoomLevel: 16,
            centerCoordinate: coordinates,
          }}
        />
        <MapboxGL.MarkerView {...{ coordinate: coordinates }}>
          <Image
            {...{
              source: require('../assets/marker.png'),
              style: { width: 32, height: 32 },
            }}
          />
        </MapboxGL.MarkerView>
      </MapboxGL.MapView>
    </View>
  );
};

export default Map;
