import React, { useState } from 'react'
// Components
import {
    View,
    Text,
    ViewStyle,
    TouchableHighlight,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native'
import Swipeable from 'react-native-swipeable';
import { MaterialCommunityIcons, Entypo, EvilIcons } from '@expo/vector-icons';
// Types
import { Task } from '../../database';

// Styles
import { COLORS, positionHelpers } from '../../styles'
import styles from './styles'

import navigationService from '../../navigation/navigationService';

interface Props {
    style?: ViewStyle | ViewStyle[]
    taskId?: number
    taskName?: string
    taskDescription?: string
}


const TaskItem: React.FC<Props> = ({
    style,
    taskId,
    taskName,
    taskDescription
}) => {

    const onPress = () => {
        navigationService.navigate(
            'Goal',
            {
                screen: 'Task_Actions',
                params: {
                    taskId: taskId,
                    taskName: taskName, taskDescription: taskDescription
                }
            }
        )

    };

    return (
        <TouchableOpacity
            style={[styles.itemContainer, positionHelpers.alighStart, style]}
            onPress={onPress}
        >
            <View style={styles.mainContainer}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="target-variant" size={24} color="white" />
                </View>
                <Text style={styles.optionsText}>{taskName}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default TaskItem