import React from 'react';
// Screens
import ArchiveMainScreen from '../screens/Archive/ArchiveMainScreen';

// Libs & Utils
import { createStackNavigator } from '@react-navigation/stack';

// Types
import { ARCHIVE_ROUTES } from './routes';

const ArchiveTabs = createStackNavigator();

const ArchiveNavigator = () => (
  <ArchiveTabs.Navigator
    initialRouteName={ARCHIVE_ROUTES.MAIN_ARCHIVES}
    headerMode="none"
    >
    <ArchiveTabs.Screen name={ARCHIVE_ROUTES.MAIN_ARCHIVES} component={ArchiveMainScreen} />
  </ArchiveTabs.Navigator>
);

export default ArchiveNavigator;