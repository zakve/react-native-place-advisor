/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import PlacesNavigator from './navigation/PlacesNavigator'

const App = () => {
  return (
    <PlacesNavigator />
  );
};

const styles = StyleSheet.create({

});

export default App;
