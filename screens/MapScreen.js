import React from 'react';
import {
  MapView,
  Location,
} from 'expo';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: parseFloat(this.props.location.latitude),
        longitude: parseFloat(this.props.location.longitude),
      },
    };
  }

  componentDidMount() {
    Location.watchPositionAsync({
      distanceInterval: 1,
      accuracy: 6,
    }, (location) => {
      console.log(location);
      this.setState({
        region: {
          latitude: parseFloat(location.coords.latitude),
          longitude: parseFloat(location.coords.longitude),
        },
      });
    });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        }}
        followsUserLocation
        showsUserLocation
      />
    );
  }
}

export default MapScreen;
