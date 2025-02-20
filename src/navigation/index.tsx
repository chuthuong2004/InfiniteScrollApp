import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {flex} from '../styles';
import {APP_COLORS_LIGHT, COLORS_APP} from '../utils/constants';
import {AppNavigation} from './app';
import { useNetworkInternet } from '../hooks';

const Navigation = () => {
  const isInternet = useNetworkInternet();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={[flex.flex1]}>
        <NavigationContainer
          onStateChange={async state => {
            console.log('state', state);
          }}
          theme={APP_COLORS_LIGHT}>
          <GestureHandlerRootView style={[flex.flex1]}>
            <View style={[flex.flex1]}>
              <AppNavigation />
              {!isInternet && (
                <View style={styles.isInternet}>
                  <Text>No internet connection !</Text>
                </View>
              )}
            </View>
          </GestureHandlerRootView>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};
export default Navigation;

const styles = StyleSheet.create({
  isInternet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS_APP.danger,
    height: 40,
    justifyContent: 'center',
  },
});
