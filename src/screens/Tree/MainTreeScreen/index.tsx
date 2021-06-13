import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, FlatList, View } from 'react-native';
import Header from '../../../components/Header';
import FolderItem from '../../../components/FolderItem';
import TaskItem from '../../../components/TaskItem';

// Database
import { insertFolder, selectFolderById, selectFolders, selectFoldersByLocation } from '../../../database/actions/foldersTree'
import { insertItem, selectItems } from '../../../database/actions/items';

// Types
import { Folder, Task } from '../../../database';

// Styles
import styles from './styles';

import navigationService from '../../../navigation/navigationService';

const TreeMainScreen = () => {
  const [foldersList, setFoldersList] = useState<Folder[]>([])
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null)

  useEffect(() => {
    selectFoldersByLocation(currentFolderId).then((folders) => {
      setFoldersList(folders);
      console.log(folders);
    })
    selectItems().then((tasks) => {
      setTasksList(tasks);
      console.log(tasks);
    })
  }, [currentFolderId])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Tree" onPlusPress={() => {
        navigationService.navigate('Tree', {screen: 'New_Item' })
      }} />
      <View style={styles.pageContainer}>
        <FlatList
          data={foldersList}
          style={{ flexGrow: 0 }}
          keyExtractor={(item) => `${item.name}_${item.id}`}
          renderItem={
            ({ item }) =>
              <FolderItem
                onItemPress={() => {
                  setCurrentFolderId(item.id)
                }}
                folderName={item.name}
                style={{ marginTop: 1 }}
              />
          }
        />
        <FlatList
          data={tasksList}
          style={{ flexGrow: 0 }}
          keyExtractor={(item) => `${item.name}_${item.id}`}
          renderItem={
            ({item}) => 
              <TaskItem 
                taskName={item.name} 
                style={{marginTop: 1}} 
              />
          } 
        />
      </View>
    </SafeAreaView>
  );
};

export default TreeMainScreen;
