import {FavoriteStackParamList} from './favorites';
import {HomeStackParamList} from './home/types';

// app navigation
export type AppStackParamList = {
  HomeStack: HomeStackParamList;
  FavoriteStack: FavoriteStackParamList;
};
