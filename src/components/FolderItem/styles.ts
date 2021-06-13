import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export default StyleSheet.create({
  itemContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  iconContainer: {
    backgroundColor: COLORS.GREY,
    paddingHorizontal: 5,
    borderRadius: 6,
  },
  optionsText: {
    fontSize: 17,
    marginTop: 4,
    fontWeight: '400',
    marginLeft: 20,
    color: COLORS.BLACK,
  },
  buttonContainer: {
    paddingVertical: 5,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 75,
    alignItems: 'center',
  },
});