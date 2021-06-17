import { StyleSheet } from 'react-native'
import { COLORS } from '../../../styles';
import { SCREEN_WIDTH } from '../../../styles/helpers';

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE_SMOKE,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputPickerIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  pickerIconPosition: {
    marginTop: 15,
    marginRight: 15,
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.GREY
  },
  separatorLine: {
    backgroundColor: 'grey',
    height: 1,
    width: SCREEN_WIDTH,
    marginTop: 5,
  },
  iconContainer: {
    backgroundColor: COLORS.GREY,
    paddingHorizontal: 5,
    borderRadius: 6,
    marginLeft: 5,
  },
});
