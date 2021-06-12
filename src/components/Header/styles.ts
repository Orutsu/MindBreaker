import { StyleSheet } from 'react-native'
import { COLORS } from '../../styles'


export default StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    height: 60,
    backgroundColor: COLORS.WHITE,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
})
