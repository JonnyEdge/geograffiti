import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
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
    focused = {focused}
    name = "ios-airplane"
    />
  ),
};

const AddStack = createStackNavigator({
  Add: AddScreen,
})

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused = {focused}
    name = "ios-airplane"
    />
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen,
})

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused = {focused}
    name = "ios-airplane"
    />
  ),
};

export default createBottomTabNavigator({
    AddStack,
    DiscoverStack,
    MapStack
});

