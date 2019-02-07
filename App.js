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
import HeaderIcon from './components/HeaderIcon';
import Icon from 'react-native-vector-icons/FontAwesome'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // header: {
  // flex: 1,
  //   // flexDirection: 'row',
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  //   backgroundColor: 'red',
  //   fontSize: 40
  // }
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
        {/* <View style={styles.header}>
        {
          this.state.fontLoaded ? (
            <Header
            containerStyle={{height: 50}}
            backgroundColor='#ffffff'
            centerComponent={{ 
              // text: 'GeoGraffiti',
              icon: 'star',
              style: {
                size: 5,
              }, 
              // style: {
              //   fontSize: 2,
              //   paddingTop: 0,
              //   marginTop: 0,
              //   // fontFamily: 'Lobster',
              // },
              }}
            />
          ) : null
        }
        </View> */}
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
