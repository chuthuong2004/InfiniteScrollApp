import {APP_HEIGHT, APP_WIDTH} from '@utils/constants';
import {StyleSheet} from 'react-native';

export const flex = StyleSheet.create({
  zIndex: {
    zIndex: 1,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  itemsStretch: {
    alignItems: 'stretch',
  },
  widthFull: {
    width: '100%',
  },
  heightFull: {
    height: '100%',
  },
  'h-screen': {
    height: APP_HEIGHT,
  },
  'w-screen': {
    width: APP_WIDTH,
  },
  full: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  itemsStart: {
    alignItems: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  gap2: {
    gap: 2,
  },
  gap4: {
    gap: 4,
  },
  gap5: {
    gap: 5,
  },
  gap8: {
    gap: 8,
  },
  gap10: {
    gap: 10,
  },
  gap15: {
    gap: 15,
  },
  gap20: {
    gap: 20,
  },
});
