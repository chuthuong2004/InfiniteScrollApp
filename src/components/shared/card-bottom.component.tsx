import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

// ** Constants
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CardProps} from './card.component';
import {flex, SHADOW_STYLE, spacing} from '@styles/index';
import {APP_WIDTH, StyleSheetProps, SIZE_APP} from '@utils/constants';
interface CartBottomProps extends CardProps {
  absolute?: boolean;
  noBackground?: boolean;
}
const CartBottom = ({
  children,
  shadow = true,
  corner = true,
  absolute,
  transparent,
  style,
  noBackground = false,
}: CartBottomProps) => {
  const {colors} = useTheme();
  const styles = styling({colors});
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        flex.widthFull,
        noBackground ? {} : styles.bgCard,
        spacing('padding').around,
        APP_WIDTH / 30 < insets.bottom && {
          paddingBottom: insets.bottom,
        },
        shadow && SHADOW_STYLE.shadowTop,
        corner && styles.corner,
        transparent && styles.transparent,
        absolute && styles.absolute,
        flex.row,
        flex.gap10,
        style,
      ]}>
      {children}
    </View>
  );
};
export default memo(CartBottom);

const styling = ({colors}: Pick<StyleSheetProps, 'colors'>) =>
  StyleSheet.create({
    bgCard: {
      backgroundColor: colors.card,
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
    },
    transparent: {
      backgroundColor: colors.background,
    },
    corner: {
      borderTopLeftRadius: SIZE_APP.sm,
      borderTopRightRadius: SIZE_APP.sm,
    },
  });
