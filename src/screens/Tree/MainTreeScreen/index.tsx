import React, { useEffect, useMemo, useState } from 'react';
// Components
import { SafeAreaView, FlatList, View } from 'react-native';
import Header from '../../../components/Header';
import FolderItem from '../../../components/FolderItem';
import TaskItem from '../../../components/TaskItem';

// Libs && Utills
import navigationService from '../../../navigation/navigationService';
import { useIsFocused } from '@react-navigation/native';

// Database
import { deleteFolder, insertFolder, selectFolderById, selectFolders, selectFoldersByLocation } from '../../../database/actions/foldersTree'
import { deleteItem, insertItem, selectItems, selectItemsFromFolder } from '../../../database/actions/items';

// Types
import { Folder, Task } from '../../../database';

// Styles
import styles from './styles';



const TreeMainScreen = () => {
  const isFocused = useIsFocused()
  const [foldersList, setFoldersList] = useState<Folder[]>([])
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<number>(0)
  const [locationFolder, setLocationFolder] = useState();

  const fetchFoldersAndItems = async () => {
    console.log('kek')
    selectFoldersByLocation(currentFolderId).then((folders) => {
      setFoldersList(folders);
    })
    selectItemsFromFolder(currentFolderId).then((tasks) => {
      setTasksList(tasks);
    })
    selectFolderById(currentFolderId).then((folder) => {
      setLocationFolder(folder)
    })
  }

  useEffect(() => {
    // selectFolders().then((folders) => {
    //   // console.log("All folders")
    //   // console.log(folders);
    // })
    // selectItems().then((tasks) => {
    //   // console.log("All tasks")
    //   // console.log(tasks);
    // })
    fetchFoldersAndItems()
  }, [currentFolderId, isFocused])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {currentFolderId == 0 &&
        <Header 
          title={locationFolder?.name} 
          onPlusPress={() => {
            navigationService.navigate('Tree', { screen: 'New_Item', params: { folderId: currentFolderId } })
          }}
        />
      }
      {currentFolderId != 0 &&
        <Header 
          title={locationFolder?.name} 
          onPlusPress={() => {
            navigationService.navigate('Tree', { screen: 'New_Item', params: { folderId: currentFolderId }})
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
                onDeletePress={() => {
                  deleteFolder(item.id)
                  fetchFoldersAndItems()
                }}
                onEditPress={() => {
                  navigationService.navigate('Tree', {
                    screen: 'Edit_Folder',
                    params: {
                      folderToEdit: item
                    }
                  })
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
                taskName={item.name}
                onDeletePress={() => {
                  deleteItem(item.id)
                  fetchFoldersAndItems()
                }}
                style={{ marginTop: 1 }}
              />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TreeMainScreen;
