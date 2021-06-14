import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, FlatList, View } from 'react-native';
import Header from '../../../components/Header';
import FolderItem from '../../../components/FolderItem';
import TaskItem from '../../../components/TaskItem';

// Database
import { insertFolder, selectFolderById, selectFolders, selectFoldersByLocation } from '../../../database/actions/foldersTree'
import { insertItem, selectItems, selectItemsFromFolder } from '../../../database/actions/items';

// Types
import { Folder, Task } from '../../../database';

// Styles
import styles from './styles';

import navigationService from '../../../navigation/navigationService';

const TreeMainScreen = () => {
  const [foldersList, setFoldersList] = useState<Folder[]>([])
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<number>(0)
  const [locationFolder, setLocationFolder] = useState<Folder | null>(null)

  useEffect(() => {
    selectFolderById(0).then((folder) => {
      setLocationFolder(folder)
    })
  }, [])

  useEffect(() => {

    selectFolders().then((folders) => {
      console.log("All folders")
      console.log(folders);
    })
    selectItems().then((tasks) => {
      console.log("All tasks")
      console.log(tasks);
    })
    selectFoldersByLocation(currentFolderId).then((folders) => {
      console.log("Current folders")
      setFoldersList(folders);
      console.log(folders);
    })
    selectItemsFromFolder(currentFolderId).then((tasks) => {
      console.log("Current tasks")
      setTasksList(tasks);
      console.log(tasks);
    })
    selectFolderById(currentFolderId).then((folder) => {
      setLocationFolder(folder)
    })
  }, [currentFolderId])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {currentFolderId == 0 &&
        <Header title={locationFolder?.name} onPlusPress={() => {
          navigationService.navigate('Tree', { screen: 'New_Item', params: { folderId: currentFolderId } })
        }}
        />
      }
      {currentFolderId != 0 &&
        <Header title={locationFolder?.name} onPlusPress={() => {
          navigationService.navigate('Tree', { screen: 'New_Item', params: { folderId: currentFolderId } })
        }}
        onBack={() => {
          setCurrentFolderId(locationFolder?.locationId)
        }}
        />
      }
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
            ({ item }) =>
              <TaskItem
                id={item.id}
                taskName={item.name}
                style={{ marginTop: 1 }}
              />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TreeMainScreen;
