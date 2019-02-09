import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
// import {
//   Header
// } from 'react-native-elements';
import {
  Permissions,
  Font,
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
    // fontLoaded: false,
  };

  componentDidMount() {
    this._cameraPermission();
    this._getFontAsync();
  }

  _cameraPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  _getFontAsync = async () => {
    await Font.loadAsync({
      // eslint-disable-next-line global-require
      Lobster: require('./assets/fonts/Lobster-Regular.ttf'),
    });
    // this.setState({ fontLoaded: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <MainTabNavigator />
      </View>
    );
  }
}
