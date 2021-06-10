import React from 'react';
// Screens
import HomePageScreen from '../screens/Home/HomePageScreen';

// Libs & Utils
import { createStackNavigator } from '@react-navigation/stack';

// Types
import { HOME_ROOT_ROUTES } from './routes';

const HomeTabs = createStackNavigator();

const HomeNavigator = () => (
  <HomeTabs.Navigator
    headerMode="none"
    initialRouteName={HOME_ROOT_ROUTES.HOME}>
    <HomeTabs.Screen name={HOME_ROOT_ROUTES.HOME} component={HomePageScreen} />
  </HomeTabs.Navigator>
);

export default HomeNavigator;
