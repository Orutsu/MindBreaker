import React, { useEffect } from 'react';
// Components
import { SafeAreaView, Text, TextInput, Button } from 'react-native';
import Header from '../../../components/Header';

import { insertFolder, selectFolderById } from '../../../database/actions/foldersTree'

const TreeMainScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Tree" />
      <Text style={{ marginTop: 20 }}>
        TreeMainScreen
      </Text>
      <Button title="suka" onPress={ async() => {

        let id : number;
        await insertFolder("FolderName", null).then((insertedId) => {
          id = insertedId;
        })

        await selectFolderById(id).then((folder) => {
          console.log(folder)
        })

      }} />
    </SafeAreaView>
  );
};

export default TreeMainScreen;
