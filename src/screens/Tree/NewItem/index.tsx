import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../../components/Header';
import { AntDesign } from '@expo/vector-icons';

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
import { positionHelpers, spacingHelpers } from '../../../styles';

const itemTypes = [
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
  const [type, setType] = useState(null)
  const [folderName, setFolderName] = useState('')
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  const onCreatePress = async () => {
    if (type == 'Folder') {
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
      <View style={styles.pageContainer}>
        <RNPickerSelect
          style={{ ...pickerSelectStyles }}
          placeholder={{
            label: 'Select a type of added item...',
            value: null,
          }}
          items={itemTypes}
          onValueChange={(value) => {
            setType(value)
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => <AntDesign name="downcircleo" size={20} color="grey" style={styles.pickerIconPosition} />}
          value={type}
        />
        <View style={styles.separatorLine} />
        {type == 'Folder' && 
          <>
            <TextInput placeholder={'Folder name'} style={[styles.inputPickerIOS, spacingHelpers.mT20]} value={folderName} onChangeText={(value) => { setFolderName(value) }} />
          </>
        }
        {type == 'Task' && 
          <> 
            <TextInput placeholder={'Task name'} style={[styles.inputPickerIOS, spacingHelpers.mT20]} value={taskName} onChangeText={(value) => { setTaskName(value) }} />
            <TextInput placeholder={'Task description'} style={[styles.inputPickerIOS, spacingHelpers.mT20]} value={taskDescription} onChangeText={(value) => { setTaskDescription(value) }}></TextInput>
          </>
        }
        {type !== null && 
          <TouchableOpacity onPress={onCreatePress} style={[styles.button, positionHelpers.center, spacingHelpers.mT20]}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        }
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
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  inputAndroid: {
    height: 50,
    fontSize: 17,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
    justifyContent:'center',
    alignItems: 'center',
  },
});