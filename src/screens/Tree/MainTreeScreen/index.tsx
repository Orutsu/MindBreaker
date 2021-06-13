import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, Text, TextInput, Button, FlatList, View } from 'react-native';
import Header from '../../../components/Header';
import FolderItem from '../../../components/FolderItem';

// Database
import { insertFolder, selectFolderById, selectFolders } from '../../../database/actions/foldersTree'
import { insertItem, selectItems } from '../../../database/actions/items';

// Types
import { Folder, Task } from '../../../database';

// Styles
import styles from './styles';


const TreeMainScreen = () => {
  const [foldersList, setFoldersList] = useState<Folder[]>([])
  const [tasksList, setTasksList] = useState<Task[]>([])

  useEffect(() => {
    selectFolders().then((folders) => {
      setFoldersList(folders);
      console.log(folders);
    })
    selectItems().then((tasks) =>  {
      setTasksList(tasks);
      console.log(tasks);
    })
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Tree" />
      <View style={styles.pageContainer}>
        <FlatList 
          data={foldersList} 
          style={{flexGrow: 0}}
          keyExtractor={(item) => `${item.name}_${item.id}`} 
          renderItem={
            ({item}) => 
              <FolderItem 
                onItemPress={() => {
                  insertItem("Random task", "ssss", null).then((insertedId) => {
                      console.log(insertedId)
                  })
                }} 
                folderName={item.name} 
                style={{marginTop: 1}}
              />
          } 
        />
        <FlatList 
          data={tasksList} 
          style={{flexGrow: 0}}
          keyExtractor={(item) => `${item.name}_${item.id}`} 
          renderItem={
            ({item}) => <Text>{item.name}</Text>
          } 
        />
      </View>
    </SafeAreaView>
  );
};

export default TreeMainScreen;
