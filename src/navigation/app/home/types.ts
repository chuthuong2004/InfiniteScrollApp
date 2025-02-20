import {StackScreenProps} from '@react-navigation/stack';

// ** Navigation types

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;
