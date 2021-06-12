import React, { useEffect } from 'react';
// Components
import { SafeAreaView, Text } from 'react-native';
import Header from '../../../components/Header';
import navigationService from '../../../navigation/navigationService';

const GoalMainScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Goal" onBack={() => navigationService.goBack()}/>
      <Text style={{marginTop: 20}}>
      GoalMainScreen
      </Text>
    </SafeAreaView>
  );
};

export default GoalMainScreen;