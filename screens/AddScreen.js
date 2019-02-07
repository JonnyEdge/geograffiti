import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  ActivityIndicator,
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
  statusMessage: {
    color: 'green',
    backgroundColor: 'lime',
  },
  errorMessage: {
    color: 'red',
    backgroundColor: 'pink',
  },
});

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      working: false,
      image: {
        latitude: null,
        longitude: null,
        time: null,
        url: null,
      },
      statusMessage: null,
      errorMessage: null,
    };
  }

  static navigationOptions = {
    title: 'GeoGraffiti',
  };

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
    this.setState({
      working: true,
    });
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
      .then(res => {
        if (res.status === 201) {
          this.setState({
            working: false,
            image: {
              lat: null,
              lon: null,
              time: null,
              url: null,
            },
            statusMessage: 'Image Uploaded',
          });
        }
      })
      .catch(error => {
        this.setState({
          working: false,
          image: {
            lat: null,
            lon: null,
            time: null,
            url: null,
          },
          errorMessage: error.message,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.working && (
            <React.Fragment>
              <Text>Uploading...</Text>
              <ActivityIndicator />
            </React.Fragment>
          )
        }
        {
          this.state.statusMessage && !this.state.working && (
            <Text
              style={styles.statusMessage}
            >
              {this.state.statusMessage}
            </Text>
          )
        }
        {
          this.state.errorMessage && !this.state.working && (
            <Text
              style={styles.errorMessage}
            >
              {this.state.errorMessage}
            </Text>
          )
        }
        { this.state.image.url && !this.state.working && (
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
        { !this.state.image.url && !this.state.working && (
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
