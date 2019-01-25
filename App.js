import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {
  Permissions,
  Location,
} from 'expo';
import MainTabNavigator from './navigation/MainTabNavigator';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  state ={
    location: {},
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ location: location.coords });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MainTabNavigator
          screenProps={{
            location: this.state.location,
          }}
        />
      </View>
    );
  }
}
