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
import Axios from 'axios';

import {
  server,
  credentials,
} from '../config';
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
    }
  };

  uploadImage = () => {
    const formData = new FormData();
    const image = {
      uri: this.state.image.url,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    formData.append('image', image);
    formData.append('lat', this.state.image.latitude);
    formData.append('lon', this.state.image.longitude);
    formData.append('time', this.state.image.time);
    const axiosConfig = {
      headers: {
        Authorizer: credentials,
        'Content-Type': 'multipart/form-data',
      },
    };
    Axios.post(`${server}/images`, formData, axiosConfig)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        { this.state.image.url && (
        <React.Fragment>
          <Image
            source={{ uri: this.state.image.url }}
            style={{
              width: 400,
              height: 400,
            }}
          />
          <Button
            onPress={this.uploadImage}
            title="Upload Image"
          />
          <Button
            onPress={this.chooseImage}
            title="Edit"
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
