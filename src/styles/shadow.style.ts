import {COLORS_APP} from '@utils/constants';
import {Platform, StyleSheet} from 'react-native';

export const SHADOW_STYLE = StyleSheet.create({
  shadowCard: {
    shadowColor: Platform.OS === 'ios' ? '#000000cc' : '#00000030',
    shadowOffset: {
      width: -3,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5.05,
    elevation: 12,
  },
  shadowPrimary: {
    shadowColor: Platform.OS === 'ios' ? COLORS_APP.primary : '#00000030',
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5.05,
    elevation: 12,
  },
  shadowTop: {
    shadowColor: Platform.OS === 'ios' ? '#524c4c68' : '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 30,
  },
});
