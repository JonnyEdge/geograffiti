import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        latitude: null,
        longitude: null,
        time: null,
        url: null,
      }
    };
  }

  chooseImage = async () => {
    const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
//      const image = await ImagePicker
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          This is the Add screen!
        </Text>
      </View>
    );
  }
}

export default AddScreen;
