import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, Text, TextInput, Button } from 'react-native';
import Header from '../../../components/Header';

// Database
import { insertFolder, selectFolderById, selectFolders } from '../../../database/actions/foldersTree'

// Types
import { Folder } from '../../../database';

const TreeMainScreen = () => {
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    selectFolders().then((folders) => {
      setFolders(folders);
      console.log(folders);
    })
  }, [])

  return (
    <SafeAreaView>
      <Header title="Tree" />
      <Text style={{ marginTop: 20 }}>
        TreeMainScreen
      </Text>
      <Button title="suka" onPress={ async() => {

        let id = -1;
        await insertFolder("FolderKeke", null).then((insertedId) => {
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
