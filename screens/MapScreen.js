import React from 'react';
import {
  MapView,
} from 'expo';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: parseFloat(this.props.location.latitude),
        longitude: parseFloat(this.props.location.longitude),
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      },
    };
  }

  static navigationOptions = {
    title: 'GeoGraffiti',
  };

  _handleRegionChange = mapRegion => {
    this.setState({ region: mapRegion });
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        followsUserLocation
        showsUserLocation
        onRegionChangeComplete={this._handleRegionChange}
        provider="google"
      />
    );
  }
}

export default MapScreen;
