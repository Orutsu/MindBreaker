import React, { useEffect } from 'react';
// Components
import { SafeAreaView, Text } from 'react-native';
import Header from '../../../components/Header';

const ArchiveMainScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Archive" />
      <Text style={{marginTop: 20}}>
      ArchiveMainScreen
      </Text>
    </SafeAreaView>
  );
};

export default ArchiveMainScreen;