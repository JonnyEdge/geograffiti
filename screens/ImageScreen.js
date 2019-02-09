import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Image from 'react-native-image-progress';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const ImageScreen = props => {
  return (
    <View
      style={styles.container}
    >
      <Image
        source={{ uri: props.navigation.getParam('image') }}
        style={styles.image}
      />
    </View>
  );
};

export default withNavigation(ImageScreen);
