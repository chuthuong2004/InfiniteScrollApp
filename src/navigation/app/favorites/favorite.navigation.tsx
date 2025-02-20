import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {FavoriteStackParamList} from './types';
import {FavoritesScreen} from '@screens/app';

const Stack = createStackNavigator<FavoriteStackParamList>();

export const FavoriteStack = () => {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={screenOptions}
      initialRouteName="Favorite">
      <Stack.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
    </Stack.Navigator>
  );
};
