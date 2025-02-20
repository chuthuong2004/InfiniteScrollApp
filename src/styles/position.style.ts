import { StyleSheet } from 'react-native';
type PositionLocation = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

type ValuePosition =
  | Pick<PositionLocation, 'top' | 'left'>
  | Pick<PositionLocation, 'top' | 'right'>
  | Pick<PositionLocation, 'bottom' | 'left'>
  | Pick<PositionLocation, 'bottom' | 'right'>;

type PositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type PositionParams =
  | {
      position: 'top-left';
      distance: number | Pick<PositionLocation, 'top' | 'left'>;
    }
  | {
      position: 'top-right';
      distance: number | Pick<PositionLocation, 'top' | 'right'>;
    }
  | {
      position: 'bottom-left';
      distance: number | Pick<PositionLocation, 'bottom' | 'left'>;
    }
  | {
      position: 'bottom-right';
      distance: number | Pick<PositionLocation, 'bottom' | 'right'>;
    };

const positionData = (
  distance: PositionLocation | number
): Record<PositionType, ValuePosition> => {
  return {
    'bottom-left': {
      bottom: typeof distance === 'number' ? distance : distance?.bottom || 0,
      left: typeof distance === 'number' ? distance : distance?.left || 0,
    },
    'bottom-right': {
      bottom: typeof distance === 'number' ? distance : distance?.bottom || 0,
      right: typeof distance === 'number' ? distance : distance?.right || 0,
    },
    'top-right': {
      top: typeof distance === 'number' ? distance : distance?.top || 0,
      right: typeof distance === 'number' ? distance : distance?.right || 0,
    },
    'top-left': {
      top: typeof distance === 'number' ? distance : distance?.top || 0,
      left: typeof distance === 'number' ? distance : distance?.left || 0,
    },
  };
};
export const POSITION_STYLE = ({ distance = 0, position }: PositionParams) => {
  const style = positionData(distance as PositionLocation | number)[position];
  return StyleSheet.create({
    absolute: {
      position: 'absolute',
      ...style,
    },
  });
};
