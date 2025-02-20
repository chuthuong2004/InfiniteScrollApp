import {useTheme} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {SHADOW_STYLE} from '../styles';
import {APP_COLORS_LIGHT, StyleSheetProps} from '../utils/constants';

export interface CardProps extends ViewProps {
  shadow?: boolean;
  corner?: boolean;
  outline?: boolean;
  primary?: boolean;
  transparent?: boolean;
  bgWhite?: boolean;
  paddingVertical?: boolean;
  paddingHorizontal?: boolean;
}
const CardComponent = ({
  shadow,
  corner = true,
  outline = false,
  primary,
  bgWhite = false,
  paddingVertical = true,
  paddingHorizontal = true,
  transparent,
  ...passProps
}: CardProps) => {
  const {colors} = useTheme();
  const styles = styling({colors});
  return (
    <View
      {...passProps}
      style={[
        styles.container,
        paddingVertical && styles.paddingVertical,
        paddingHorizontal && styles.paddingHorizontal,
        corner && styles.corner,
        outline && styles.outline,
        primary && styles.primary,
        transparent && styles.transparent,
        shadow && SHADOW_STYLE.shadowCard,
        bgWhite && styles.bgWhite,
        passProps.style,
      ]}>
      {passProps.children}
    </View>
  );
};
export default memo(CardComponent);

const styling = ({colors}: Pick<StyleSheetProps, 'colors'>) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.card,
    },
    paddingHorizontal: {
      paddingHorizontal: 10,
    },
    paddingVertical: {
      paddingVertical: 10,
    },
    corner: {borderRadius: 8},
    outline: {
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    primary: {
      borderColor: colors.primary,
    },
    transparent: {
      backgroundColor: colors.background,
      borderColor: colors.background,
    },
    bgWhite: {
      backgroundColor: APP_COLORS_LIGHT.colors.card,
    },
  });
