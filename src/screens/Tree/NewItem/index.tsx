import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import Header from '../../../components/Header';
import FolderItem from '../../../components/FolderItem';

// Libs && Utills
import navigationService from '../../../navigation/navigationService';

// Database
import { insertFolder, selectFolderById, selectFolders, selectFoldersByLocation } from '../../../database/actions/foldersTree'
import { insertItem, selectItems } from '../../../database/actions/items';

// Types
import { Folder, Task } from '../../../database';

// Styles
import styles from './styles';
import { StyleSheet } from 'react-native'


import RNPickerSelect from 'react-native-picker-select';

let itemTypes = [
  {
    label: 'Folder',
    value: 'Folder',
  },
  {
    label: 'Task',
    value: 'Task',
  },
]

const NewItemScreen = ({ route }) => {
  const folderId = route.params.folderId
  const [type, setType] = useState('Folder')
  const [folderName, setFolderName] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  const onCreatePress = async () => {
    if (type == 'Folder') {
      console.log(folderName, folderId);
      await insertFolder(folderName, folderId);
    }
    else if (type == 'Task') {
      await insertItem(taskName, taskDescription, folderId);
    }
    navigationService.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="New item" onBack={() => {
        navigationService.goBack()
      }} />
      <Text>type</Text>
      <View style={styles.pageContainer}>
        <RNPickerSelect
          style={{ ...pickerSelectStyles }}
          items={itemTypes}
          onValueChange={(value) => {
            setType(value)
          }}
          value={type}
        />
        {type == 'Folder' && <Text>Folder name</Text>}
        {type == 'Folder' && <TextInput style={styles.inputPickerIOS} value={folderName} onChangeText={(value) => { setFolderName(value) }}></TextInput>}


        {type == 'Task' && <Text>Task name</Text>}
        {type == 'Task' && <TextInput style={styles.inputPickerIOS} value={taskName} onChangeText={(value) => { setTaskName(value) }}></TextInput>}


        {type == 'Task' && <Text>Task description</Text>}
        {type == 'Task' && <TextInput style={styles.inputPickerIOS} value={taskDescription} onChangeText={(value) => { setTaskDescription(value) }}></TextInput>}

        <TouchableOpacity onPress={onCreatePress} style={styles.button}>
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default NewItemScreen;


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});