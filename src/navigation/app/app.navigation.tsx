import {IMAGES} from '@assets/images';
import {CardBottom, TextNormal} from '@components/shared';
import {FavoriteStack} from '@navigation/app/favorites';
import {HomeStack} from '@navigation/app/home';
import {AppStackParamList} from '@navigation/app/types';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {PlatformPressable} from '@react-navigation/elements';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import {COLORS_APP} from '@utils/constants';
import React, {useCallback} from 'react';
import {Image, Platform, View} from 'react-native';

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

function CustomTabBar({
  state,
  descriptors,
  navigation,
}: Readonly<BottomTabBarProps>) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <CardBottom
      style={[
        {
          padding: 0,
          gap: 0,
          height: Platform.OS === 'ios' ? 80 : 70,
          paddingBottom: 0,
          borderTopWidth: 1,
          borderColor: colors.border,
        },
      ]}>
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
              flex.widthFull,
              {paddingBottom: Platform.OS === 'android' ? 0 : 10},
            ]}
            key={route.key}>
            <PlatformPressable
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                flex.flex1,
                flex.widthFull,
                flex.heightFull,
                flex.itemsCenter,
                flex.justifyCenter,
                flex.gap4,
              ]}>
              <Image
                source={label === 'HomeStack' ? IMAGES.home : IMAGES.love}
                style={{width: 20, height: 20}}
              />
              <TextNormal
                style={{color: isFocused ? colors.primary : colors.text}}>
                {label.toString().replace('Stack', '')}
              </TextNormal>
            </PlatformPressable>
          </View>
        );
      })}
    </CardBottom>
  );
}
