import React from 'react';
import Axios from 'axios';
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import ImageCard from '../components/ImageCard';

export default class DiscoverScreen extends React.Component {
  state ={
    images: null,
    refreshing: false,
  };

  static navigationOptions = {
    title: 'GeoGraffiti',
  };

  componentDidMount() {
    Axios.get('https://geo-graffiti-api.herokuapp.com/images')
      .then((response) => {
        this.setState({
          images: response.data,
        });
      });
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    Axios.get('https://geo-graffiti-api.herokuapp.com/images')
      .then((response) => {
        this.setState({
          images: response.data,
          refreshing: false,
        });
      });
  }

  render() {
    return (
      this.state.images ? (
        <React.Fragment>
          <ScrollView pinchGestureEnabled minimumZoomScale={1.0} maximumZoomScale={2.0}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
            }
          >
            {this.state.images.map(image => (
              <ImageCard
                key={image._id}
                url={image.url}
                latitude={image.lat}
                longitude={image.lon}
                time={image.time}
              />
            ))}
          </ScrollView>
        </React.Fragment>
      ) : (
        <View>
          <Text>Working...</Text>
          <ActivityIndicator />
        </View>
      )
    );
  }
}
