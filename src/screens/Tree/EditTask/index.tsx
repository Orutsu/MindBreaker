import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import Header from '../../../components/Header';
import FolderItem from '../../../components/FolderItem';

// Database
import { insertFolder, selectFolderById, selectFolders, selectFoldersByLocation } from '../../../database/actions/foldersTree'
import { insertItem, selectItems } from '../../../database/actions/items';

// Types
import { Folder, Task } from '../../../database';

// Styles
import styles from './styles';
import { StyleSheet } from 'react-native'

import navigationService from '../../../navigation/navigationService';

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

interface Props {
    taskId: number
}

const EditTaskScreen: React.FC<Props> = ({
  taskId
}) => {

  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Edit task" onBack={() => {
        navigationService.goBack()
      }} />

    </SafeAreaView>
  );
};



export default EditTaskScreen;

