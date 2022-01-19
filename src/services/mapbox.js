import React from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import MapboxGL from '@react-native-mapbox-gl/maps';

/**
 * render map UI inside onto the app
 * @param { lat: string, lng: string}   coordinates   return from Geocoding
 * @returns JSX.Element
 */
const Map = ({ coordinates, isAppear }) => {
  MapboxGL.setAccessToken(Config.MAPBOX_API_KEY);
  return (
    <View {...{ style: { height: '100%', width: '100%' } }}>
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
        {isAppear && (
          <MapboxGL.PointAnnotation
            {...{ id: 'marker', coordinate: coordinates }}
          />
        )}
      </MapboxGL.MapView>
    </View>
  );
};

export default Map;
