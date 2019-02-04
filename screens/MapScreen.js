import React from 'react';
import {
  MapView,
} from 'expo';
import Axios from 'axios';
import { server } from '../config';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      region: {
        latitude: parseFloat(this.props.location.latitude),
        longitude: parseFloat(this.props.location.longitude),
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      },
    };
  }

  componentWillMount() {
    if (!this.state.region.latitude) {
      console.log('not ready yet');
    }
  }

  componentDidMount() {
    console.log(server);
    Axios.get(`${server}/images`)
      .then(res => {
        this.setState({
          markers: res.body,
        });
        console.log(res);
      });
  }

  _handleRegionChange = mapRegion => {
    this.setState({ region: mapRegion });
  };

  render() {
    return (
      this.state.region.latitude && (
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          followsUserLocation
          showsUserLocation
          onRegionChangeComplete={this._handleRegionChange}
          provider="google"
        />
      )
    );
  }
}

export default MapScreen;
