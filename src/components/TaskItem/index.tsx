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

// Types
import { Task } from '../../database';

// Styles
import { COLORS, positionHelpers } from '../../styles'
import styles from './styles'

interface Props {
  style?: ViewStyle | ViewStyle[]
  taskName?: string
  onItemPress?: () => void
}

const rightButtons = [
  <TouchableOpacity 
    style={[styles.buttonContainer, {backgroundColor: COLORS.LIGHT_RED}]} 
    onPress={() => console.log('Delete')}
  >
    <EvilIcons name="trash" size={40} color="#EE4B2B" />
    <Text style={{fontSize: 12, color: '#EE4B2B'}}>Delete</Text>
  </TouchableOpacity>,
  <TouchableOpacity 
    style={[styles.buttonContainer, {backgroundColor: COLORS.LIGHT_BLUE}]}
  >
    <EvilIcons name="pencil" size={40} color="#0047AB" />
    <Text style={{fontSize: 12, marginLeft: -2, color: '#0047AB'}}>Edit</Text>
  </TouchableOpacity>
];

const TaskItem: React.FC<Props> = ({
  style,
  taskName,
  onItemPress,
}) => (
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

export default TaskItem