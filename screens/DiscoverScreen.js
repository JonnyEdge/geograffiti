import React from 'react';
import Axios from 'axios';
import {
  ScrollView,
} from 'react-native';
import ImageCard from '../components/ImageCard';

export default class DiscoverScreen extends React.Component {
  state ={
    images: [],
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

  render() {
    return (
      <React.Fragment>
        <ScrollView pinchGestureEnabled minimumZoomScale={1.0} maximumZoomScale={2.0}>
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
    );
  }
}
