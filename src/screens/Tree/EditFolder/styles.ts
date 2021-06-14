import { StyleSheet } from 'react-native'
import { COLORS } from '../../../styles';

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
  },
  inputPickerIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    paddingTop: 13,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});
