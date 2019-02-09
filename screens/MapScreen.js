import React from 'react';
import {
  MapView,
  Location,
  Permissions,
} from 'expo';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import Axios from 'axios';
import { server } from '../config';
import { withNavigation } from 'react-navigation';

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
    const propLocation = props.navigation.getParam('location');
    this.state = {
      markers: null,
      region: {
        latitude: propLocation ? propLocation.latitude : null,
        longitude: propLocation ? propLocation.longitude : null,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      },
    };
  }

  static navigationOptions = {
    title: 'GeoGraffiti',
  };

  componentDidMount() {
    this._getMarkers();
  }

  onPressMarker = (_, marker) => {
    this.props.navigation.navigate('Image', {
      lat: marker.lat,
      lon: marker.lon,
      image: marker.url,
    });
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        },
      });
    }
  };

  _getMarkers = () => {
    Axios.get(`${server}/images`)
      .then(res => {
        this.setState({
          markers: res.data,
        });
        if (!this.state.region) {
          this._getLocationAsync();
        }
      });
  };

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
          {
            this.state.markers.map(marker => (
              <MapView.Marker
                key={marker._id}
                coordinate={{
                  latitude: parseFloat(marker.lat),
                  longitude: parseFloat(marker.lon),
                }}
                onPress={event => {
                  this.onPressMarker(event, marker);
                }
                }
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

export default withNavigation(MapScreen);
