import React from 'react';
import {
  MapView,
} from 'expo';

export default (screenProps) => {
  console.log(screenProps.location);
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: parseFloat(screenProps.screenProps.location.latitude),
        longitude: parseFloat(screenProps.screenProps.location.longitude),
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      }}
    />
  );
};
