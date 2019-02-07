import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Header } from 'react-native-elements';
import {
  Permissions,
  Location,
  Font,
} from 'expo';
import MainTabNavigator from './navigation/MainTabNavigator';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default class App extends React.Component {
  state ={
    fontLoaded: false,
    location: {},
  };

  componentDidMount() {
    this._getLocationAsync();
    this._getFontAsync();
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ location: location.coords });
    }
  };

  _getFontAsync = async () => {
    await Font.loadAsync({
      'Lobster': require('./assets/fonts/Lobster-Regular.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render() {
      return (
      <React.Fragment>
        <View style={styles.container}>
          <MainTabNavigator
            screenProps={{
              location: this.state.location,
            }}
          />
        </View>
      </React.Fragment>
    );
    }
}
