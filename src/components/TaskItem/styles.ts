import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export default StyleSheet.create({
  itemContainer: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
  },
  iconContainer: {
    height: 30,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  mainContainer: {
    paddingLeft: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  descriptionContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
  }
});