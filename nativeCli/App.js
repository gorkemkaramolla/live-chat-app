import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './components/Navigators/AuthNavigator';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  // useEffect(() => {
  //   removeFew = async () => {
  //     const keys = ['@access_token', '@current_user', '@current_user_id'];
  //     try {
  //       await AsyncStorage.multiRemove(keys);
  //       console.debug(
  //         'Application starts keys are removed all keys exist : ' +
  //           (await AsyncStorage.getAllKeys()),
  //       );
  //     } catch (e) {
  //       // remove error
  //     }
  //   };
  //   removeFew();
  // }, []);

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
