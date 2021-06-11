import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export default StyleSheet.create({
  tabbar: {
    backgroundColor: COLORS.WHITE,
    height: 58,
    marginHorizontal: 10,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  optionsText: {
    fontSize: 10,
    lineHeight: 12,
    marginTop: 4,
  },
  optionContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});