import {COLORS_APP} from '../../utils/constants';
import {FavoriteStack} from './favorites';
import {HomeStack} from './home';
import {AppStackParamList} from '.';
import {flex, SHADOW_STYLE, spacing} from '../../styles';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {PlatformPressable} from '@react-navigation/elements';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import {CardBottom, TextNormal} from '../../components';
import homeIcon from '../../assets/images/home.png';
import favoriteIcon from '../../assets/images/love.png';

const RootStack = createBottomTabNavigator<AppStackParamList>();

export function AppNavigation() {
  const options: BottomTabNavigationOptions = {
    tabBarHideOnKeyboard: true,
    headerShown: false,
    // unmountOnBlur: true,
    tabBarActiveTintColor: COLORS_APP.primary,
    tabBarInactiveTintColor: COLORS_APP.success,
    tabBarShowLabel: false,
    animation: 'shift',
  };

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <CustomTabBar {...props} />,
    [],
  );
  return (
    <RootStack.Navigator
      id={undefined}
      initialRouteName="HomeStack"
      screenOptions={options}
      tabBar={renderTabBar}>
      <RootStack.Screen name="HomeStack" component={HomeStack} />
      <RootStack.Screen name="FavoriteStack" component={FavoriteStack} />
    </RootStack.Navigator>
  );
}

function CustomTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  console.log('state', state);

  return (
    <CardBottom style={[flex.row, {height: 90}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View
            style={[
              flex.flex1,
              flex.heightFull,
              flex.itemsCenter,
              flex.justifyCenter,
            ]}
            key={index}>
            <PlatformPressable
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[flex.flex1, flex.itemsCenter, flex.justifyCenter, flex.gap4]}>
              <Image source={label === 'HomeStack' ? homeIcon : favoriteIcon} style={{width: 20, height: 20}} />
              <TextNormal
                style={{color: isFocused ? colors.primary : colors.text}}>
                {label.replace('Stack', '')}
              </TextNormal>
            </PlatformPressable>
          </View>
        );
      })}
    </CardBottom>
  );
}
