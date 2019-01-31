import React from 'react';
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
