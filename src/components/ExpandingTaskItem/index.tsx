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
  onDeletePress?: () => void
  onEditPress?: () => void
  onCancelArchive?: () => void
  isOpen : boolean,
  setIsOpen?: (id:number) => void
}


const TaskItem: React.FC<Props> = ({
  style,
  taskId,
  taskName,
  taskDescription,
  onDeletePress,
  onEditPress,
  onCancelArchive,
  isOpen,
  setIsOpen
}) => {

  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(isOpen ? null: taskId);
  };

  const rightButtons = [];
  if(onDeletePress){
    rightButtons.push( <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: COLORS.LIGHT_RED }]}
        onPress={() => onDeletePress && onDeletePress()}
      >
        <EvilIcons name="trash" size={40} color="#EE4B2B" />
        <Text style={{ fontSize: 12, color: '#EE4B2B' }}>Delete</Text>
      </TouchableOpacity>)
  }
  if(onEditPress){
    rightButtons.push(    <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: COLORS.LIGHT_BLUE }]}
        onPress={() => onEditPress && onEditPress()}
      >
        <EvilIcons name="pencil" size={40} color="#0047AB" />
        <Text style={{ fontSize: 12, marginLeft: -2, color: '#0047AB' }}>Edit</Text>
      </TouchableOpacity>)
  }
  if(onCancelArchive){
    rightButtons.push(<TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: COLORS.LIGHT_BLUE }]}
        onPress={() => onCancelArchive && onCancelArchive()}
      >
        <MaterialCommunityIcons name="progress-alert" size={24} color="#0047AB" />
        <Text style={{ fontSize: 12, marginLeft: -2, color: '#0047AB' }}>Back to tree</Text>
      </TouchableOpacity>)
  }

  return (
    <Swipeable rightButtons={rightButtons} >
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
        {isOpen && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.optionsText}>{taskDescription}</Text>
        </View>)
      }
      </TouchableOpacity>

    </Swipeable >
  )
}


export default TaskItem