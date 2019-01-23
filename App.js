import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default () => (
  <View style={styles.container}>
    <AppNavigator />
  </View>
);
