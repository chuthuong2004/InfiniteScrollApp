import React from 'react';
import {HomeScreen} from '@screens/app';
import {HomeStackParamList} from './types';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={screenOptions}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
    </Stack.Navigator>
  );
};
