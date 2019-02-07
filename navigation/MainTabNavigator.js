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
  Add: (props) => {
    return (
      <AddScreen
        navigation={props.navigation}
      />
    );
  },
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
        navigation={props.navigation}
      />
    );
  },
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
