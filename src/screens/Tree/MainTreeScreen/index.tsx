import React, { useEffect, useMemo, useState } from 'react';
// Components
import { SafeAreaView, FlatList, View, Alert } from 'react-native';
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



const TreeMainScreen = ({ isArchived }) => {

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
      isArchived
        ? setTasksList(tasks.filter(task => task.isArchived))
        : setTasksList(tasks);
    })
    selectFolderById(currentFolderId).then((folder) => {
      setLocationFolder(folder)
    })
  }

  useEffect(() => {
    selectFolders().then((folders) => {
      console.log("All folders")
      console.log(folders);
    })
    selectItems().then((tasks) => {
      console.log("All tasks")
      console.log(tasks);
    })
    fetchFoldersAndItems()
  }, [currentFolderId, isFocused])

  const headetTitle = isArchived
    ? `Archived(${locationFolder?.name})`
    : locationFolder?.name


  const renderHeader = () => {
    if (currentFolderId == 0 && isArchived == 'true') {
      return <Header
        title={headetTitle}
      />
    }
    if (currentFolderId != 0 && isArchived == 'true') {
      return <Header
        title={headetTitle}
        onBack={() => {
          setCurrentFolderId(locationFolder?.locationId)
        }}
      />
    }
    // tree(not archived)
    if (currentFolderId == 0) {
      return <Header
        title={headetTitle}
        onPlusPress={() => {
          navigationService.navigate('Tree', { screen: 'New_Item', params: { folderId: currentFolderId } })
        }}
      />
    }
    if (currentFolderId != 0) {
      return <Header
        title={headetTitle}
        onPlusPress={() => {
          navigationService.navigate('Tree', { screen: 'New_Item', params: { folderId: currentFolderId } })
        }}
        onBack={() => {
          setCurrentFolderId(locationFolder?.locationId)
        }}
      />
    }
  }
  const foldersListWithTypes = foldersList.map(item => { return { ...item, type: 'folder' } })
  const tasksListWithTypes = tasksList.map(item => { return { ...item, type: 'task' } })
  const itemsList = [...foldersListWithTypes, ...tasksListWithTypes]
  const renderFolderItem = ({item}) => {
    console.log("item")
    console.log(item)
    if (item.type == 'folder') {
      return <FolderItem
        onItemPress={() => {
          setCurrentFolderId(item.id)
        }}
        onDeletePress={() => {
          Alert.alert(
            `Deleting folder ${item.name}`,
            "All tasks inside folder will be deleted. Are you sure you want to delete folder?",
            [
              {
                text: "Yes, delete.",
                onPress: () => {
                  deleteFolder(item.id)
                  fetchFoldersAndItems()
                },
                style: "default"
              },
              {
                text: "Cancel", onPress: () => console.log("OK Pressed"),
                style: "cancel"
              }
            ]
          );
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
    if (item.type == 'task') {
      return <TaskItem
        taskName={item.name}
        onDeletePress={() => {
          deleteItem(item.id)
          fetchFoldersAndItems()
        }}
        onEditPress={() => {
          navigationService.navigate('Tree', {
            screen: 'Edit_Task',
            params: {
              taskToEdit: item
            }
          })
        }}
        style={{ marginTop: 1 }}
      />
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderHeader()}
      <View style={styles.pageContainer}>
        <FlatList
          data={itemsList}
          keyExtractor={(item) => `${item.name}_${item.id}`}
          renderItem={renderFolderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default TreeMainScreen;
