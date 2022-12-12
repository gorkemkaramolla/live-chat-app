import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './components/Navigators/AuthNavigator';
export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
