import React, { forwardRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native';

// ** Components

// ** React navigation
import { useTheme } from '@react-navigation/native';
import { flex } from '../styles';
import { COLORS_APP, FONT_SIZE, StyleSheetProps, TextVariant } from '../utils/constants';
import TextNormal from './TextNormal';

export interface InputComponentProps extends TextInputProps {
  contentSizeChange?: boolean;
  transparent?: boolean;
  iconLeft?: any;
  onPressRight?: TextInputProps['onPressIn'];
  iconRight?: any;
  error?: string;
  label?: string;
  rounded?: boolean;
  variant?: TextVariant;
  border?: boolean;
  renderRightContent?: any;
  inputStyle?: TextInputProps['style'];
  selectable?: boolean;
  onClearValue?: (value: string | null) => void;
  onFocusDefault?: () => void; // Add this line
  onBlurDefault?: () => void; // Add this line
  disabled?: boolean;
}
// eslint-disable-next-line react/display-name
const InputComponent = forwardRef<TextInput, InputComponentProps>(
  (props, ref) => {
    const {
      contentSizeChange = false,
      transparent,
      iconLeft,
      multiline,
      onPressRight,
      value,
      iconRight,
      placeholder,
      error,
      label,
      rounded,
      variant,
      border,
      disabled,
      renderRightContent,
      numberOfLines,
      enterKeyHint = 'done',
      clearButtonMode = 'while-editing',
      ...rest
    } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState(0);
    const {colors, dark} = useTheme();
    const styles = styling({
      colors,
      iconLeft,
      iconRight,
      error,
      rounded,
      variant,
      dark,
    });
    const colorIcon = {
      error: COLORS_APP.danger,
      primary: colors.primary,
      text: colors.text,
    };
    const Component = props.onPressIn ? Pressable : View;
    return (
      <View style={[flex.gap4, props.style]}>
        {label && <TextNormal size="md">{label}</TextNormal>}
        <Component
          onPress={props.onPressIn}
          style={[
            styles.container,
            renderRightContent ? flex.gap4 : {},
            renderRightContent ? flex.itemsEnd : {},
          ]}>
          {props?.selectable && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                opacity: 1,
                zIndex: 1,
              }}
            />
          )}

          <TextInput
            ref={ref}
            value={value}
            onContentSizeChange={event =>
              contentSizeChange &&
              setHeight(event.nativeEvent.contentSize.height)
            }
            multiline={multiline}
            {...rest}
            // onPressIn={() => {}}
            onPress={props.onPressIn}
            style={[
              styles.textInput,
              contentSizeChange && {height},
              isFocused && !error && {borderColor: colors.primary},
              transparent && {backgroundColor: colors.background},
              border && {borderColor: colors.border},
              variant && {borderColor: COLORS_APP[variant]},
              disabled && styles.disabled,
              renderRightContent ? flex.flex1 : {},
              multiline && !numberOfLines && {minHeight: 120},
              props.inputStyle,
            ]}
            placeholderTextColor={dark ? '#f7f8f95a' : '#414b5a8e'}
            placeholder={placeholder}
            onBlur={e => {
              if (props.onBlur) {
                props.onBlur(e);
              } else {
                setIsFocused(false);
                props.onBlurDefault?.();
              }
            }}
            textAlignVertical={multiline && !numberOfLines ? 'top' : 'center'}
            // for IOS
            keyboardAppearance={dark ? 'dark' : 'light'}
            onFocus={e => {
              if (props.onFocus) {
                props.onFocus(e);
              } else {
                setIsFocused(true);
                props.onFocusDefault?.();
              }
            }}
            clearButtonMode={clearButtonMode}
            enterKeyHint={enterKeyHint}
            numberOfLines={numberOfLines}
          />
          {renderRightContent && (
            <View style={[styles.renderRightContent]}>
              {renderRightContent}
            </View>
          )}
        </Component>

        {/* Handle Error */}
        {error && typeof error === 'string' && (
          <TextNormal error size="sm" style={{paddingLeft: 4}}>
            {error}
          </TextNormal>
        )}
      </View>
    );
  },
);
const styling = ({
  colors,
  iconLeft,
  iconRight,
  error,
  rounded,
  variant,
  dark,
}: StyleSheetProps & Partial<InputComponentProps>) =>
  StyleSheet.create({
    textInput: {
      width: '100%',
      backgroundColor: colors.card,
      borderRadius: rounded ? 50 : 8,
      fontSize: FONT_SIZE.md,
      color: variant ? COLORS_APP[variant] : colors.text,
      borderColor: error ? COLORS_APP.danger : 'transparent',
      borderWidth: 1,
      maxHeight: 160,
      paddingLeft: iconLeft ? 36 : 15,
      paddingRight: iconRight || Platform.OS === 'android' ? 36 : 15,
      paddingTop: Platform.OS === 'ios' ? 20 : 15,
      paddingBottom: Platform.OS === 'ios' ? 20 : 15,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconLeft: {
      position: 'absolute',
      left: 10,
      zIndex: 1,
    },
    renderRightContent: {
      zIndex: 1,
    },
    iconRightContainer: {
      position: 'absolute',
      right: 10,
      width: 40,
      paddingVertical: 8,
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 2,
    },
    disabled: {
      backgroundColor: dark ? '#1e273c' : '#ededed',
    },
  });
export default React.memo(InputComponent);
