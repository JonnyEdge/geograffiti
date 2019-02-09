import React from 'react';
import Axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ImageCard from '../components/ImageCard';

const styles = StyleSheet.create({
  images: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default class DiscoverScreen extends React.Component {
  state ={
    images: null,
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
      this.state.images ? (
        <React.Fragment>
          <ScrollView
            style={styles.images}
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
        <ActivityIndicator />
      )
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
