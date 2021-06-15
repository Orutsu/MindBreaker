import React, { useEffect } from 'react';
// Components
import { SafeAreaView, Text } from 'react-native';
import Header from '../../../components/Header';

import TreeMainScreen from '../../Tree/MainTreeScreen'

const ArchiveMainScreen = () => {
  return (
    <TreeMainScreen isArchived = 'true' />
  );
};

export default ArchiveMainScreen;