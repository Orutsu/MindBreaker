import React from 'react';
// Screens
import TreeMainScreen from '../screens/Tree/MainTreeScreen';

// Libs & Utils
import { createStackNavigator } from '@react-navigation/stack';

// Types
import { TREE_ROUTES } from './routes';


const TreeTabs = createStackNavigator();

const TreeNavigator = () => (
  <TreeTabs.Navigator
    initialRouteName={TREE_ROUTES.MAIN_TREE}
    headerMode="none"
    >
    <TreeTabs.Screen name={TREE_ROUTES.MAIN_TREE} component={TreeMainScreen} />
  </TreeTabs.Navigator>
);

export default TreeNavigator;