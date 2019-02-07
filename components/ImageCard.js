import React from 'react';
import { Image, Text, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

export default (props) => (
  console.log(props.url) || <Image
    style={{ width: imageWidth, height: imageHeight }}
    source={{ uri: props.url }}
  />
);
