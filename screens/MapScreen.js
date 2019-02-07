import React from 'react';
import {
  MapView,
} from 'expo';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import Axios from 'axios';
import { server } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
          markers: res.data,
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
        >
          {/* <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.state.markers[0].lat),
              longitude: parseFloat(this.state.markers[0].lon) * -1,
            }}
          /> */}
          {
            this.state.markers.map(marker => (
              <MapView.Marker
                key={marker._id}
                coordinate={{
                  latitude: parseFloat(marker.lat),
                  longitude: parseFloat(marker.lon),
                }}
              />
            ))
          }
        </MapView>
      ) : (
        <View style={styles.container}>
          <Text>Working...</Text>
          <ActivityIndicator />
        </View>
      )
    );
  }
}

export default MapScreen;
