import React from 'react';
// Components
import TabBar from '../components/TabBar';
import TreeNavigator from './TreeNavigator';
import GoalNavigator from './GoalNavigator';
import ArchiveNavigator from './ArchiveNavigator';

// Libs & Utils
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Types
import { DASHBOARD_ROOT_ROUTES } from './routes';

const DashboardTabs = createBottomTabNavigator();

const DashboardNavigator = () => (
  <DashboardTabs.Navigator
    initialRouteName={DASHBOARD_ROOT_ROUTES.TREE}
    tabBar={() => <TabBar />}
    >
    <DashboardTabs.Screen name={DASHBOARD_ROOT_ROUTES.TREE} component={TreeNavigator} />
    <DashboardTabs.Screen name={DASHBOARD_ROOT_ROUTES.GOAL} component={GoalNavigator} />
    <DashboardTabs.Screen name={DASHBOARD_ROOT_ROUTES.ARCHIVE} component={ArchiveNavigator} />
  </DashboardTabs.Navigator>
);

export default DashboardNavigator;
