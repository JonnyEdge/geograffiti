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
      name="ios-airplane"
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
      name="ios-airplane"
    />
  ),
};

const MapStack = createStackNavigator({
  Map: (screenProps) => {
    console.log(screenProps);
    return <MapScreen location={JSON.stringify(screenProps.location)} />;
  },
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-airplane"
    />
  ),
};

export default createAppContainer(createBottomTabNavigator({
  AddStack,
  DiscoverStack,
  MapStack,
}));
