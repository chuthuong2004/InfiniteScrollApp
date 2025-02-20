import {APP_WIDTH} from '../utils/constants';
import {StyleSheet} from 'react-native';
type SpacingType = 'margin' | 'padding';

/**
 * Spacing styles
 * @param {*} type "margin" | "padding"
 * @param {*} percent 0 to 100. Default 30
 * @param {*} quantity spacing by quantity
 * @returns
 */
export const spacing = (
  type: SpacingType,
  percent = 30,
  quantity = APP_WIDTH / percent,
) =>
  StyleSheet.create({
    // ** margin | padding
    around: {
      [type]: quantity,
    },
    left: {
      [`${type}Left`]: quantity,
    },
    top: {
      [`${type}Top`]: quantity,
    },
    right: {
      [`${type}Right`]: quantity,
    },
    bottom: {
      [`${type}Bottom`]: quantity,
    },
    vertical: {
      [`${type}Vertical`]: quantity,
    },
    horizontal: {
      [`${type}Horizontal`]: quantity,
    },
  });
