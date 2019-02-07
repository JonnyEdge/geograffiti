import React from 'react';
import { Image, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
// const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

export default (props) => (
  console.log(props.url) || <Image
    style={{ width: imageWidth, height: imageHeight }}
    // style={{ resizeMode: 'contain' }}
    // source={{ uri: 'https://ichef.bbci.co.uk/images/ic/720x405/p0517py6.jpg' }}
    source={{ uri: props.url }}
  />
);
import {
  Image,
  View,
} from 'react-native';

export default (props) => {
  return (
    <React.Fragment>
      <View>
        <Image
          source={{ uri: props.url }}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
    </React.Fragment>
  );
};
