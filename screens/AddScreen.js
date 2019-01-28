import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'expo';
import moment from 'moment';

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
      },
    };
  }

  componentDidMount() {
    this._cameraPermission();
  }

  _cameraPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  chooseImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      exif: true,
      base6: true,
    });
    if (!image.cancelled) {
      this.setState({
        image: {
          latitude: image.exif.GPSLatitude,
          longitude: image.exif.GPSLongitude,
          url: image.uri,
          time: new Date().getTime(),
        },
      });
      console.log(this.state.image.time);
    }
  };

  uploadImage = () => {
    console.log(this.state.image.time);
  };

  render() {
    return (
      <View style={styles.container}>
        { this.state.image.url && (
        <React.Fragment>
          <Image
            source={{ uri: this.state.image.url }}
            style={{
              width: 500,
              height: 500,
            }}
          />
          <Button
            onPress={this.uploadImage}
            title="Upload Image"
          />
        </React.Fragment>
        )}
        { !this.state.image.url && (
          <Button
            onPress={this.chooseImage}
            title="Choose Image"
          />
        )}
      </View>
    );
  }
}

export default AddScreen;
