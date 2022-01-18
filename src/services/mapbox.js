import React from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import MapboxGL from '@react-native-mapbox-gl/maps';

const Map = ({ children, coordinates }) => {
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
      </MapboxGL.MapView>
      {children}
    </View>
  );
};

export default Map;
