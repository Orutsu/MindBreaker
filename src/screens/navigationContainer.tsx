import React, { useEffect } from 'react';
// Components
import { HomeNavigator } from '../navigation';
import { NavigationContainer as NavigationWrap } from '@react-navigation/native';

// Libs & Utils
import {
  isReadyNavigation,
  navigationRef,
} from '../navigation/navigationService';

const NavigationContainer = () => {
  useEffect(() => {
    return () => {
      isReadyNavigation.current = false;
    };
  }, []);

  return (
    <NavigationWrap
      ref={navigationRef}
      onReady={() => {
        isReadyNavigation.current = true;
      }}>
      <HomeNavigator />
    </NavigationWrap>
  );
};

export default NavigationContainer;
