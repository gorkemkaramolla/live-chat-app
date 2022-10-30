import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from '../constants';
import SearchAndFind from '../Screens/Home/Feed/SearchAndFind';
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.Login}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9B59B6',
        },
        headerTintColor: 'white',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={ROUTES.SEARCH}
        component={SearchAndFind}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default AuthNavigator;
