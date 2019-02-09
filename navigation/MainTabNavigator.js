import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import DiscoverScreen from '../screens/DiscoverScreen';
import AddScreen from '../screens/AddScreen';
import MapScreen from '../screens/MapScreen';
import ImageScreen from '../screens/ImageScreen';

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen,
});

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Discover',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-search"
    />
  ),
};

const AddStack = createStackNavigator({
  Add: AddScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-camera"
    />
  ),
};

const MapStack = createStackNavigator({
  Map: (props) => {
    return (
      <MapScreen
        location={props.screenProps.location}
      />
    );
  },
  Image: (props) => {
    return (
      <ImageScreen
        image={props.screenProps.image}
      />
    );
  },
  initialRouteName: 'Map',
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-map"
    />
  ),
};

export default createAppContainer(createBottomTabNavigator({
  AddStack,
  DiscoverStack,
  MapStack,
}));
