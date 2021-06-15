import React, { useEffect, useState } from 'react';
// Components
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import Header from '../../../components/Header';

// Libs && Utills
import navigationService from '../../../navigation/navigationService';

// Database
import { updateItemName, updateItemDescription } from '../../../database/actions/items';

// Types
import { Task } from '../../../database';

// Styles
import { positionHelpers, spacingHelpers } from '../../../styles';
import styles from './styles';

const EditTaskScreen = ({route}) => {
  const task: Task = route.params.taskToEdit
  const [taskName, setTaskName] = useState(task.name)
  const [taskDescription, setTaskDescription] = useState(task.description)

  const onEditScreen = () => {
    updateItemName(task.id, taskName)
    updateItemDescription(task.id, taskDescription)
    navigationService.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Edit task" onBack={() => {
        navigationService.goBack()
      }} />
      <View style={styles.pageContainer}>
        <Text style={styles.inputTitle}>Task name:</Text>
        <TextInput placeholder={'Task name'} style={[styles.inputPickerIOS, spacingHelpers.mT10]} value={taskName} onChangeText={(value) => { setTaskName(value) }} />
        <Text style={styles.inputTitle}>Task description:</Text>
        <TextInput placeholder={'Task description'} style={[styles.inputPickerIOS, spacingHelpers.mT10]} value={taskDescription} onChangeText={(value) => { setTaskDescription(value) }} />
        <TouchableOpacity onPress={onEditScreen} style={[styles.button, positionHelpers.center, spacingHelpers.mT20]}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default EditTaskScreen;
