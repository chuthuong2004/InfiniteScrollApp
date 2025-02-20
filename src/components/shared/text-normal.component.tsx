import {useTheme} from '@react-navigation/native';
import {
  TextVariant,
  SizeText,
  COLORS_APP,
  StyleSheetProps,
  FONT_SIZE,
} from '@utils/constants';
import React, {forwardRef} from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';

export interface TextNormalProps extends TextProps {
  error?: boolean;
  text?: string;
  color?: string;
  variant?: TextVariant;
  align?: TextStyle['textAlign'];
  size?: SizeText;
  fontWeight?: TextStyle['fontWeight'];
  textTransform?: TextStyle['textTransform'];
  fontStyle?: TextStyle['fontStyle'];
}
const TextNormal = forwardRef<Text, TextNormalProps>((props, ref) => {
  const {children, error, text, ...passProps} = props;

  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, ...passProps});
  return (
    <Text
      ref={ref}
      {...passProps}
      style={[
        styles.text,
        passProps.style,
        error && {color: COLORS_APP.danger},
      ]}>
      {text ?? children}
    </Text>
  );
});
export default React.memo(TextNormal);
const styling = ({
  colors,
  color,
  variant,
  align = 'left',
  size = 'md',
  fontWeight = 'normal',
  textTransform = 'none',
  fontStyle = 'normal',
}: StyleSheetProps & TextNormalProps) =>
  StyleSheet.create({
    text: {
      color: variant ? COLORS_APP[variant] : color ?? colors.text,
      textAlign: align,
      fontSize: FONT_SIZE[size],
      textTransform,
      fontWeight,
      fontStyle,
    },
  });
