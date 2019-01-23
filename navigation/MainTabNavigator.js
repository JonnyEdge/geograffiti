import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
    <TabBarIcon 
    focused = {focused}
    name = "ios-airplane"
    />
  ),
};

export default createBottomTabNavigator({
    HomeStack,
});

