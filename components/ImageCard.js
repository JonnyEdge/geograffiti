import React from 'react';
import { Image, Text, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

export default (props) => (
  <Image
    style={{ width: imageWidth, height: imageHeight }}
    source={{ uri: props.url }}
  />
);

// import {
//   Image,
//   View,
// } from 'react-native';

// export default (props) => {
//   return (
//     <React.Fragment>
//       <View>
//         <Image
//           source={{ uri: props.url }}
//           style={{
//             width: 100,
//             height: 100,
//           }}
//         />
//       </View>
//     </React.Fragment>
//   );
// };
