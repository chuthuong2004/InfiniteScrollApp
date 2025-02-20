/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import Navigation from './src/navigation';
import React from 'react';
import { AppState } from 'react-native';
import 'react-native-gesture-handler';

import { SWRConfig } from 'swr';

function App(): React.JSX.Element {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isOnline() {
          console.log('isOnline');

          /* Customize the network state detector */
          return true;
        },
        isVisible() {
          console.log('isVisible');
          /* Customize the visibility state detector */
          return true;
        },
        initFocus(callback) {
          /* Register the listener with your state provider */
          let appState = AppState.currentState;
          console.log('app state: ' + appState);

          const onAppStateChange = nextAppState => {
            /* If it's resuming from background or inactive mode to active one */
            if (
              appState.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              callback();
            }
            appState = nextAppState;
          };

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener(
            'change',
            onAppStateChange,
          );

          return () => {
            subscription.remove();
          };
        },
        initReconnect(callback) {
          console.log('reconnect', callback);
          /* Register the listener with your state provider */
        },
        onError(error, key, config) {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            // or show a notification UI.
          }
        },
        onErrorRetry(error, key, config, revalidate, revalidateOpts) {
          // Never retry on 404.
          if (error.status === 404 && error.status === 403) {
            return;
          }

          // Never retry for a specific key.
          if (key === '/api/user') {
            return;
          }

          // Only retry up to 10 times.
          if (revalidateOpts.retryCount >= 2) {
            return;
          }

          // Retry after 5 seconds.
          setTimeout(
            () => revalidate({retryCount: revalidateOpts.retryCount}),
            5000,
          );
        },
        shouldRetryOnError: false,
      }}>
      <Navigation />
    </SWRConfig>
  );
}
export default App;
