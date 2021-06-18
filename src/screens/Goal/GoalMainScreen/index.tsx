import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
// Components
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import Header from '../../../components/Header';
import { Folder, Task } from '../../../database';
import { selectFolders } from '../../../database/actions/foldersTree';
import { deleteItem, selectItems, selectItemsFromFolder } from '../../../database/actions/items';
import navigationService from '../../../navigation/navigationService';
import { positionHelpers, spacingHelpers } from '../../../styles';
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons';
import styles from './styles';
import TaskItem from '../../../components/TaskItem';

const GoalMainScreen = () => {
    const isFocused = useIsFocused()
    const [foldersList, setFoldersList] = useState<Folder[]>([])
    const [tasksList, setTasksList] = useState<Task[]>([])

    const fetchFoldersAndItems = async () => {
        selectFolders().then((folders) => {
            // console.log("All folders", folders);
            setFoldersList(folders)
        })
        selectItems().then((tasks) => {
            // console.log("All tasks", tasks);
            setTasksList(tasks);
        })
    }

    // Діма вибач за код нижче, він просто існує. Не рухай його, і він не буде рухати тебе)00)
    const processedList = useMemo(() => {
        if (tasksList.length === 0 || foldersList.length === 0) {
            return []
        }
        let newList: any[] = foldersList
        newList = foldersList.map((item) => {
            let taskInFolder: Task[] = [];
            taskInFolder = tasksList.filter((task) => task.folderId === item.id && task.isGoalForToday === true)
            return Object.assign(item, { taskInFolder: [...taskInFolder] })
        })
        return newList.filter((item) => item.taskInFolder.length > 0);
    }, [tasksList, foldersList])

    console.log('processedList', processedList)

    useEffect(() => {
        fetchFoldersAndItems()
    }, [isFocused])

    return (
        <SafeAreaView>
            <Header title="Goal" />
            <FlatList
                style={{ marginBottom: 60 }}
                data={processedList}
                renderItem={({ item }) => {
                    return (
                        <>
                            <View style={[positionHelpers.rowStart, spacingHelpers.mT10]}>
                                <View style={styles.iconContainer}>
                                    <Entypo name="folder" size={30} color="#fceea7" />
                                </View>
                                <Text style={[styles.labelText, spacingHelpers.mL5]}>{item.name}</Text>
                            </View>
                            <View style={styles.separatorLine} />
                            {item.taskInFolder.map((item) => {
                                return (
                                    <TaskItem
                                        taskDescription={item.description}
                                        taskId={item.id}
                                        style={{ marginTop: 1 }}
                                        taskName={item.name}
                                    />
                                )
                            })}
                        </>
                    )
                }}
            />
        </SafeAreaView>
    );
};

export default GoalMainScreen;