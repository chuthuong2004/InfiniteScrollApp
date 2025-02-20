import {StackScreenProps} from '@react-navigation/stack';

// ** Navigation types

export type FavoriteStackParamList = {
  Favorite: undefined;
};

export type FavoriteStackScreenProps<T extends keyof FavoriteStackParamList> =
  StackScreenProps<FavoriteStackParamList, T>;
