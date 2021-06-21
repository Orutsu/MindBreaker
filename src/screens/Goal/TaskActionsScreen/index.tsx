import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
// Components
import { FlatList, SafeAreaView, Text, View, ViewStyle, TouchableOpacity } from 'react-native';
import Header from '../../../components/Header';
import { Folder, Task } from '../../../database';
import { selectFolders } from '../../../database/actions/foldersTree';
import { deleteItem, selectItems, selectItemsFromFolder, updateItemIsGoalForToday, updateItemIsArchived } from '../../../database/actions/items';
import navigationService from '../../../navigation/navigationService';
import { positionHelpers, spacingHelpers } from '../../../styles';
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons';
import styles from './styles';
import TaskItem from '../../../components/TaskItem';

interface Props {
    style?: ViewStyle | ViewStyle[]
    taskId?: number
    taskName?: string
    taskDescription?: string
}


const TaskActionsScreen: React.FC<Props> = ({ route }) => {
    const {
        taskId,
        taskName,
        taskDescription
    } = route.params;

    const refreshedHandler = () => {
        updateItemIsGoalForToday(taskId, false);
        // more complex logic
        updateItemIsArchived(taskId, true);
        navigationService.goBack()
    }
    const skippedHandler = () => {
        updateItemIsGoalForToday(taskId, false);
        navigationService.goBack()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Action task" onBack={() => {
                navigationService.goBack()
            }} />
            <View style={styles.pageContainer}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.nameItem}>{taskName}</Text>
                    <Text style={styles.descriptionItem}>{taskDescription}</Text>
                </View>
                <View style={styles.separatorLine} />
                <TouchableOpacity onPress={refreshedHandler} style={[styles.button, positionHelpers.center, spacingHelpers.mT20, {backgroundColor : 'yellow'}]}>
                    <Text style={styles.buttonText}>Refreshed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={skippedHandler} style={[styles.button, positionHelpers.center, spacingHelpers.mT20, {backgroundColor : 'coral'}]}>
                    <Text style={styles.buttonText}>Skipped</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

export default TaskActionsScreen;