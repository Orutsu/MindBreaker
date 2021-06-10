import { Dimensions, Platform } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const HIT_SLOT_DEFAULT = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

const isAndroid = Platform.OS === 'android';
const isIOs = Platform.OS === 'ios';

const isLargeDevice = SCREEN_WIDTH >= 400;
const isSmallDevice = SCREEN_WIDTH <= 375;
const isSmallHeight = SCREEN_HEIGHT <= 700;
const isMaxHeight = SCREEN_HEIGHT >= 850;

export {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  HIT_SLOT_DEFAULT,
  isSmallDevice,
  isIOs,
  isAndroid,
  isSmallHeight,
  isLargeDevice,
  isMaxHeight,
};
