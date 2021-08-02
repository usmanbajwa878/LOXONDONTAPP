/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppNavigator from './src/Navigation/NavigationContainer';
import {Provider} from 'react-redux';
import STORE from './src/Store/index';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  STORE.store;
  STORE.persistor;

  return (
    <Provider store={STORE.store}>
      <PersistGate loading={null} persistor={STORE.persistor}>
        <AppNavigator />
      </PersistGate>
      {/* <AppNavigator /> */}
      {/* <StackNavigator /> */}
    </Provider>

    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <AppNavigator />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;