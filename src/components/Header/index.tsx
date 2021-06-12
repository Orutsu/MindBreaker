import React from 'react'
import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  TextInputProps,
} from 'react-native'
import { positionHelpers } from '../../styles'
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import styles from './styles'

interface Props {
  title?: string
  onBack?: () => void
  onPlusPress?: () => void
}

const Header: React.FC<Props> = ({
  title,
  onBack,
  onPlusPress
}) => (
  <View
    style={[
      positionHelpers.rowFill,
      styles.container,
      styles.shadow,
    ]}
  >
    <TouchableOpacity onPress={() => onBack && onBack()} style={{width: 24}}>
      {onBack && 
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      }
    </TouchableOpacity>
    <Text style={styles.headerText}>{title}</Text>
    <TouchableOpacity onPress={() => onPlusPress && onPlusPress()} style={{width: 24}}>
      {onPlusPress && 
          <AntDesign name="plus" size={24} color="black" />
      }
    </TouchableOpacity>
  </View>
)

export default Header
