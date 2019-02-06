import React from 'react';
import {
  MapView,
} from 'expo';
import {
  Text,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import { server } from '../config';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: null,
      region: {
        latitude: parseFloat(this.props.location.latitude),
        longitude: parseFloat(this.props.location.longitude),
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      },
    };
  }

  componentDidMount() {
    Axios.get(`${server}/images`)
      .then(res => {
        this.setState({
          markers: res.body,
        });
      });
  }

  _handleRegionChange = mapRegion => {
    this.setState({ region: mapRegion });
  };

  render() {
    return (
      this.state.markers ? (
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          followsUserLocation
          showsUserLocation
          onRegionChangeComplete={this._handleRegionChange}
          provider="google"
        />
      ) : (
        <React.Fragment>
          <Text>Working...</Text>
          <ActivityIndicator />
        </React.Fragment>
      )
    );
  }
}

export default MapScreen;
