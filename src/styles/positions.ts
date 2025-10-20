import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const dimensions = {
  window: {
    width,
    height,
  },
  
  screen: {
    width: width,
    height: height,
  },
  
  isSmallScreen: width < 375,
  isMediumScreen: width >= 375 && width < 414,
  isLargeScreen: width >= 414,
};

export const positions = {
  // Z-indexes
  zIndex: {
    base: 1,
    overlay: 100,
    modal: 1000,
    tooltip: 1100,
    toast: 1200,
  },
  
  absolute: {
    topLeft: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
    },
    topRight: {
      position: 'absolute' as const,
      top: 0,
      right: 0,
    },
    bottomLeft: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
    },
    bottomRight: {
      position: 'absolute' as const,
      bottom: 0,
      right: 0,
    },
    center: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    fullScreen: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
};