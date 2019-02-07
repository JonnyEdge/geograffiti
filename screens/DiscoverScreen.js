import React from 'react';
import Axios from 'axios';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import ImageCard from '../components/ImageCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
        <ScrollView>
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

// export default () => (
//   <View style={styles.container}>
//     <Text>
//       This is the Discover screen!
//     </Text>
//   </View>
// );
