import React from 'react'
// Components
import {
  View,
  Text,
  ViewStyle,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import Swipeable from 'react-native-swipeable';
import { MaterialCommunityIcons, Entypo, EvilIcons } from '@expo/vector-icons';

import {deleteItem} from '../../database/actions/items'
// Types
import { Task } from '../../database';

// Styles
import { COLORS, positionHelpers } from '../../styles'
import styles from './styles'

import navigationService from '../../navigation/navigationService';

interface Props {
  id: number
  style?: ViewStyle | ViewStyle[]
  taskName?: string
  onItemPress?: () => void
}


const TaskItem: React.FC<Props> = ({
  id,
  style,
  taskName,
  onItemPress,
}) => {

  const rightButtons = [
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: COLORS.LIGHT_RED }]}
      onPress={() => deleteItem(id)}
    >
      <EvilIcons name="trash" size={40} color="#EE4B2B" />
      <Text style={{ fontSize: 12, color: '#EE4B2B' }}>Delete</Text>
    </TouchableOpacity>,
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: COLORS.LIGHT_BLUE }]}
      onPress={() => navigationService.navigate('Tree', {screen: 'Edit_Task', params : {taskId : id} })}
    >
      <EvilIcons name="pencil" size={40} color="#0047AB" />
      <Text style={{ fontSize: 12, marginLeft: -2, color: '#0047AB' }}>Edit</Text>
    </TouchableOpacity>
  ];

  return (
    <Swipeable rightButtons={rightButtons} >
      <TouchableOpacity
        style={[styles.itemContainer, positionHelpers.rowStart, style]}
        onPress={() => onItemPress && onItemPress()}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="target-variant" size={24} color="white" />
        </View>
        <Text style={styles.optionsText}>{taskName}</Text>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default TaskItem