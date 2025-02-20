import {DefaultTheme, Theme} from '@react-navigation/native';
import {Platform} from 'react-native';

export type SizeText =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';
export type StyleSheetProps = Omit<Theme, 'fonts'>;

export type TextVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success'
  | 'dark'
  | 'light';
export const COLORS_APP: Record<TextVariant, string> = {
  primary: '#f59e0b',
  secondary: '#6c757d', // #ABAAAE
  danger: '#ea5455', // #ea5455
  success: '#28c76f', // #28c76f
  warning: '#ffc107', // #ff9f43
  info: '#17a2b8', // #00cfe8
  dark: '#f5f2f2',
  light: '#414B5A',
};

export const APP_COLORS_LIGHT = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f59e0b',
    background: '#F7F8F9',
    card: '#FFFFFF',
    text: '#414B5A',
    border: '#8b8b8b36',
    notification: '#FDD36A',
  },
};

export const APP_COLORS_DARK = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f59e0b',
    background: '#161e32',
    card: Platform.OS === 'ios' ? '#283047' : '#23293d',
    // text: '#D2D2D2',
    text: '#f5f2f2',
    border: '#696969a3',
    notification: '#FDD36A',
  },
};

export const COLORS = {
  skeleton: {
    dark: '#b7b7b71e',
    light: '#dadadb31',
  },
  card: {
    dark: '#28304799',
    light: '#FFFFFF',
  },
  shadow: {
    light: '#dadada78',
    dark: '#434343ab',
  },
  status: {
    online: '#28c76f',
    offline: '#82868b',
    busy: '#ea5455',
  },
  rating: '#f8aa4b',
  heart: '#fe2c56',
};

export const BACKGROUND_AVATAR = [
  '#46cf85',
  '#36d0e8',
  '#8f86f3',
  '#fba85a',
  '#f56a00',
  '#0d9394',
  '#ffab1d',
  '#2092ec',
  '#D02ED6',
  '#B24BB6',
  '#12CC44',
  '#32553B',
  '#12B393',
  '#4051e7',
  '#1727b5',
  '#00c9bd',
  '#ec9a3a',
  '#e05252',
  '#179be6',
  '#9052e0',
];
export const randomBgAvatar = () =>
  BACKGROUND_AVATAR[Math.floor(Math.random() * BACKGROUND_AVATAR.length)];
export const COLORS_ORDER_STATUS = {
  pending: COLORS_APP.warning,
  confirm: COLORS_APP.info,
  delivering: COLORS_APP.light,
  delivered: COLORS_APP.primary,
  received: COLORS_APP.success,
  imported: '#FC6736',
  return: '#B7E5B4',
  canceled: COLORS_APP.danger,
};
