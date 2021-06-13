import React from 'react'
import {
  View,
  Text,
  ViewStyle,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import Swipeable from 'react-native-swipeable';
import { COLORS, positionHelpers } from '../../styles'
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import styles from './styles'
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons';

interface Props {
  style?: ViewStyle | ViewStyle[]
  folderName?: string
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

const FolderItem: React.FC<Props> = ({
  style,
  folderName,
  onItemPress,
}) => (
  <Swipeable rightButtons={rightButtons} >
    <TouchableOpacity 
      style={[styles.itemContainer, positionHelpers.rowStart, style]}
      onPress={() => onItemPress && onItemPress()}
    >
      <View style={styles.iconContainer}>
        <Entypo  name="folder" size={30} color="#fceea7" />
      </View>
      <Text style={styles.optionsText}>{folderName}</Text>
    </TouchableOpacity>
  </Swipeable>
)

export default FolderItem