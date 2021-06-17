import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import Header from '../../../components/Header';

// Libs && Utills
import navigationService from '../../../navigation/navigationService';

// Database
import { updateFolderName } from '../../../database/actions/foldersTree';

// Types
import { Folder } from '../../../database';

// Styles

import { positionHelpers, spacingHelpers } from '../../../styles';
import styles from './styles';

const EditFolderScreen = ({route}) => {
  const folder: Folder = route.params.folderToEdit
  const [folderName, setFolderName] = useState(folder.name)

  const onEditScreen = () => {
    updateFolderName(folder.id, folderName)
    navigationService.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Edit folder" onBack={() => {
        navigationService.goBack()
      }} />
      <View style={styles.pageContainer}>
        <Text style={styles.inputTitle}>Folder name:</Text>
        <TextInput placeholder={'Folder name'} style={[styles.inputPickerIOS, spacingHelpers.mT10]} value={folderName} onChangeText={(value) => { setFolderName(value) }} />
        <TouchableOpacity onPress={onEditScreen} style={[styles.button, positionHelpers.center, spacingHelpers.mT20]}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default EditFolderScreen;
