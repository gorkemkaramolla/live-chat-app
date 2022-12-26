import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import Register from '../Screens/Auth/Register';
import Login from '../Screens/Auth/Login';
const Stack = createNativeStackNavigator();
import {View, Text} from 'react-native';
import React from 'react';

export default function AuthDrawerNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.DRAWER}
        component={DrawerNavigator}
        options={{
          headerShown: false,
          statusBar: 'dark',
        }}
      />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{}} />

      <Stack.Screen name={ROUTES.REGISTER} component={Register} options={{}} />
    </Stack.Navigator>
  );
}
