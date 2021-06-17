import React from 'react';
// Screens
import GoalMainScreen from '../screens/Goal/GoalMainScreen';
import TaskActionsScreen from '../screens/Goal/TaskActionsScreen';

// Libs & Utils
import { createStackNavigator } from '@react-navigation/stack';

// Types
import { GOAL_ROUTES } from './routes';

const GoalTabs = createStackNavigator();

const GoalNavigator = () => (
  <GoalTabs.Navigator
    initialRouteName={GOAL_ROUTES.MAIN_GOAL}
    headerMode="none"
    >
    <GoalTabs.Screen name={GOAL_ROUTES.MAIN_GOAL} component={GoalMainScreen} />
    <GoalTabs.Screen name={GOAL_ROUTES.TASK_ACTIONS} component={TaskActionsScreen} />
  </GoalTabs.Navigator>
);

export default GoalNavigator;