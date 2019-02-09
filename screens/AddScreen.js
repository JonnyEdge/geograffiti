import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  ImagePicker,
} from 'expo';
import Axios from 'axios';
import Image from 'react-native-image-progress';

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
    padding: 10,
    borderWidth: 2,
    borderColor: 'lime',
    borderRadius: 10,
  },
  errorMessage: {
    color: 'red',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'pink',
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

  _resetImageState = () => {
    this.setState({
      image: {
        lat: null,
        lon: null,
        time: null,
        url: null,
      },
    });
  };

  _renderLoading = () => {
    this.setState({
      working: true,
    });
  };

  _unrenderLoading = () => {
    this.setState({
      working: false,
    });
  };

  chooseImage = async () => {
    this.setState({
      errorMessage: null,
      statusMessage: null,
    });
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      exif: true,
    });
    if (!image.cancelled) {
      this.setState({
        image: {
          latitude: image.exif.GPSLatitudeRef === 'S' ? image.exif.GPSLatitude * -1 : image.exif.GPSLatitude,
          longitude: image.exif.GPSLongitudeRef === 'W' ? image.exif.GPSLongitude * -1 : image.exif.GPSLongitude,
          url: image.uri,
          time: new Date().getTime(),
        },
      });
    }
  };

  uploadImage = () => {
    this._renderLoading();
    const formData = new FormData();
    const image = {
      uri: this.state.image.url,
      type: 'image/jpeg',
      name: `${Math.round(this.state.image.time + this.state.image.latitude + this.state.image.longitude)}`,
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
          this._unrenderLoading();
          this._resetImageState();
          this.setState({
            statusMessage: 'Image Uploaded',
          });
        }
        this.props.navigation.navigate('Map', {
          location: {
            latitude: res.data.lat,
            longitude: res.data.lon,
          },
        });
      })
      .catch(error => {
        this._resetImageState();
        this._unrenderLoading();
        this.setState({
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
              <Text>Working...</Text>
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
