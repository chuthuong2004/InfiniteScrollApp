import {TextNormal} from '@components/shared';
import {useNetworkInternet} from '@hooks/systems';
import {AppNavigation} from '@navigation/app';
import {NavigationContainer} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import {APP_COLORS_LIGHT, COLORS_APP} from '@utils/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

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
                  <TextNormal align="center">
                    No internet connection !
                  </TextNormal>
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
